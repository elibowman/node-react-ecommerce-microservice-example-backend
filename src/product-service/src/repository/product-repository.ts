import Product from '../entity/product';
import db from '../../db-mongo';
import mongoose from 'mongoose';
import ServerError from '../error/server-error';

export default class ProductRepository {

    async createProduct({ name, price, type, quantity, imagePaths }) {
        const product = {
            name: name,
            price: price,
            type: type,
            quantity: quantity,
            imagePaths: imagePaths
        }
        return await Product.create(product);
    }

    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        try {
            return await Product.find(
                {
                    _id: id
                }
            );
        }
        catch (e) {
            throw e;
        }
    }

    async getProductsByType(type) {
        return await Product.find(
            {
                type
            }
        )
    }

    async getProductQuantity(id) {
        const product = await Product.find(
            {
                _id: id
            }
        );
        
        return product[0].quantity;
    }

    async decreaseProductQuantity(productId, decreaseAmount) {

        const newQuantity = await this.getProductQuantity(productId) as number - decreaseAmount;
        
        return await Product.updateOne(
            {
                id: productId
            },
            {
                quantity: newQuantity
            }
        )       
    }

    async increaseProductQuantity(productId, increaseAmount) {

        const newQuantity = await this.getProductQuantity(productId) + increaseAmount;
        
        return await Product.updateOne(
            {
                id: productId
            },
            {
                quantity: newQuantity
            }
        )       
    }

    async updateProduct({ id, name, price, type, quantity, imagePaths }) {
        const product = {
            name: name,
            price: price,
            type: type,
            quantity: quantity,
            imagePaths: imagePaths
        }
        return await Product.updateOne(
            {
                id
            },
            {
                ...product
            }
        )       
    }


    /*
        // products type for fillOrder() parameter
        products = [
            id: string,
            quantity: number
        ]
    */

    async fillOrder(desiredProducts) {

        let result: any;

        await db.
            transaction(
                async (_session) => {
                    result = Promise.all(await desiredProducts.map( async desiredProduct => {
                        // get the quantity of this product if exists for order. but if it doesn't exist or there's not enough quantity throw an error
                            // try to findAndUpdate() the product if $gt quantity desired
                            // check if updated object returns or null
                            // throw an error if null
                            // return success or a success object if not null

                        const product = await this.getProductById(desiredProduct.productId);

                        if (product == null) {
                            throw new ServerError(500, 'Product not available');
                        }
                        else if (!((product[0] as any).quantity >= desiredProduct.quantity)) {
                            throw new ServerError(500, 'Quantity not available');
                        }
                        else if (product[0].price != desiredProduct.price) {
                            throw new ServerError(500, 'Product has changed');
                        }


                        const updatedProduct = await Product.findOneAndUpdate(
                            {
                                _id: desiredProduct.productId,
                                quantity: { $gte: desiredProduct.quantity }
                            },
                            { $inc: { quantity: (-1 * desiredProduct.quantity) } },
                            { 
                                new: true,
                                _session
                            }
                        );

                        if (updatedProduct == null) {
                            throw new ServerError(500, 'Quantity is not available, or a price has changed');
                        }

                        // result = [
                        //     ...result,
                            // { 
                            //     id: updatedProduct._id,
                            //     quantity: desiredProduct.quantity,
                            //     price: desiredProduct.price,
                            // }
                        // ]

                        // console.log(
                        //     { 
                        //         prductId: updatedProduct._id,
                        //         quantity: desiredProduct.quantity,
                        //         price: desiredProduct.price,
                        //     }
                        // )
                        return { 
                            productId: updatedProduct._id,
                            quantity: desiredProduct.quantity,
                            price: desiredProduct.price,
                        };
                    }));
                },
                { readPreference: 'primary' }
                
            ).
            catch((e: any) => {
                throw e;
            });

        return result;
    }

    /*
        // products type for fillOrder() parameter
        products = [
            id: string,
            quantity: number
        ]
    */

    async rollbackOrder(rollbackItems) {

        let result = {};
        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            rollbackItems.array.forEach(async rollbackItem => {

                const rolledbackItem = Product.findByIdAndUpdate(
                    {
                        id: rollbackItem.id
                    },
                    { $inc: { quantity: rollbackItem.quantity }},
                    {
                        new: true,
                        session
                    }
                )

                if (rolledbackItem == null) {
                    session.abortTransaction();
                    throw new ServerError(500, 'Unsuccessful');
                }
            });
        } 
        catch (e: any) {
            session.abortTransaction();
            throw e;
        }

        session.commitTransaction();
        session.endSession();

    }

    async deleteProductById(id) {
        return await Product.deleteOne(
            {
                id
            }
        );
    }

}
