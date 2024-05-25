import Cart from '../entity/cart';
import sequelize from 'sequelize';

export default class CartRepository {

    async getAllCartEntries() {
        return await Cart.findAll();
    };

    async getCart(userId) {
        return await Cart.findAll({
            where: {
                userId
            },
            attributes: {
                include: [
                    [
                        sequelize.fn(
                            'COUNT',
                            sequelize.col('productId')
                        ),
                        'quantity'
                    ]
                ],
                exclude: ['id', 'token', 'createdAt', 'updatedAt']
            },
            group: [
                "productId",
                "userId"
            ]
        });
    };

    async getCartItem(userId, productId) {
        return await Cart.findAll({
            where: {
                userId,
                productId
            },
            attributes: {
                include: [
                    [
                        sequelize.fn(
                            'COUNT',
                            sequelize.col('productId')
                        ),
                        'quantity'
                    ]
                ],
                exclude: ['id', 'token', 'createdAt', 'updatedAt']
            },
            group: [
                "productId",
                "userId"
            ]
        });
    }

    async addToCart(productsToAdd) {
        return await Cart.bulkCreate(productsToAdd);
    }; 

    async removeFromCart(productId, quantity) {
        return await Cart.destroy({
            where: {
                productId
            },
            limit: quantity
        })
    }

    async clearCart(userId) {
        return await Cart.destroy({
            where: {
                userId
            },
        })
    }
}
