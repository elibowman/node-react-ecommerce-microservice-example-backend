import ClientError from "../error/client-error";
import { CustomError } from "../error/custom-error";
import ProductService from "../service/product-service";

export default class ProductController {

    private productService: ProductService

    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req, res, next) {
        try {
            if (
                req.body.name == null ||
                req.body.price == null ||
                req.body.type == null ||
                req.body.quantity == null ||
                req.body.imagePaths == null
            ) {
                throw new ClientError(40, 'Submit all required values')
            }

            const product = {
                name: req.body.name,
                price: req.body.price,
                type: req.body.type,
                quantity: req.body.quantity,
                imagePaths: req.body.imagePaths
            }

            res.json(await this.productService.createProduct(product));
        }
        catch (e: any){
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error creating product"});
            }
        }
    }

    async getAllProducts(req, res, next) {
        try {
            res.json(await this.productService.getAllProducts());
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Was unable to retreive products' });
        }
    }

    async fillOrder(req, res, next) {
        try {
            if (req.body.productList == null ) {
                throw new ClientError(400, 'Product list cannot be null')
            }
            
            res.json(await this.productService.fillOrder(req.body.productList));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Unable to fill order"});
            }
        }
    }

    async getProductById(req, res, next) {
        try {
            if (req.params.id == null) {
                throw new ClientError(400, 'Id cannot be null')
            }

            res.json(await this.productService.getProductById(req.params.id));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error getting product"});
            }
        }
    }

    async getProductsByType(req, res, next) {
        res.json(await this.productService.getProductsByType(req.params.type));
    }

    async getProductQuantity(req, res, next) {
        res.json(await this.productService.getProductQuantity(req.params.id));
    }

    async updateProduct(req, res, next) {
        const product = {
            id: req.params.id,
            name: req.body.name || null,
            price: req.body.price || null,
            type: req.body.type || null,
            quantity: req.body.quantity || null,
            imagePaths: req.body.imagePaths || null
        }
        res.json(await this.productService.updateProduct(product));      
    }

    async deleteProductById(req, res, next) {
        res.json(await this.productService.deleteProductById(req.params.id));
    }
}
