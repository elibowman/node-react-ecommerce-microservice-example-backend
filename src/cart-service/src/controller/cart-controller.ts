import ClientError from '../error/client-error';
import { CustomError } from '../error/custom-error';
import CartService from '../service/cart-service';
import CartUtils from '../util/cart-utils';

export default class CartController {

    private cartService: CartService;

    constructor() {
        this.cartService = new CartService();
    }
    
    async getAllCartEntries(req, res, next) {
        try {
            res.json(await this.cartService.getAllCartEntries());
        }
        catch(e: any) {
            console.log(e);
            res.status(500).json({ error: 'Error getting cart entries'});
        }
    }

    async getCart(req, res, next) {
        try {
            if (req.params.userId == null) {
                throw new ClientError(400, 'User ID cannot be null')
            }

            res.json(await this.cartService.getCart(req.params.userId));
        }
        catch(e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error getting cart"});
            }
        }
    }

    async addToCart(req, res, next) {

        try {
            if (
                (
                    req.body.userId  == null
                    || req.body.token  == null
                )
                || req.body.productId == null
                || req.body.quantity == null

            ) {
                throw new ClientError(400, 'Userid and token or product id or quantity can\'t be null')
            }

            const productsToAdd = [...Array(Number(req.body.quantity))].map((_e, i) => {
                return (
                    { 
                        userId: req.body.userId || null,
                        token: req.body.token || null,
                        productId: req.body.productId
                    }
                )
            });

            res.json(await this.cartService.addToCart(productsToAdd));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error adding to cart"});
            }
        }
    }

    async getCartItem(req, res, next) {
        res.json(await this.cartService.getCartItem(req.params.userId, req.params.productId));
    }

    async removeFromCart(req, res, next) {
        try {
            if (req.params.productId == null || req.params.quantity == null) {
                throw new ClientError(400, 'Product id nor quantity can be null');
            }
        
            res.json(await this.cartService.removeFromCart(req.params.productId, req.params.quantity))
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error Registering user"});
            }
        }
    }

    async checkoutCart(req, res, next) {
        try {
            let token = null;
            let tokenPayload = null;

            try {
                token = req.headers.authorization.split(' ')[1];
                tokenPayload = await CartUtils.verifyToken(token);
            }
            catch {
                throw new ClientError(400, 'Invalid token');
            }

            if (tokenPayload == null || req.params.userId != (tokenPayload as any).userId) {
                throw new ClientError(400, 'Invalid token');
            }
            if (req.body.productList == null) {
                throw new ClientError(400, 'Product list cannot be null')
            }

            // res.json(await this.cartService.checkoutCart(req.params.userId));
            res.json(await this.cartService.checkoutCart((tokenPayload as any).userId, token, req.body.productList ));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error checking out cart"});
            }
        }
    }

}
