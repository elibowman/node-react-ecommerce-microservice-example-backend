// const orderRepository = require('../../../order-service/src/repository/order-repository');
import ClientError from '../error/client-error';
import ServerError from '../error/server-error';
import CartRepository from '../repository/cart-repository';
import fetch from 'node-fetch';

export default class CartService {

    private cartRepository: CartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async getAllCartEntries() {
        return await this.cartRepository.getAllCartEntries();
    }

    async getCart(userId) {
        return await this.cartRepository.getCart(userId);
    }

    async getCartItem(userId, productId) {
        return await this.cartRepository.getCartItem(userId, productId);
    }

    async addToCart(productsToAdd) {
        return await this.cartRepository.addToCart(productsToAdd)
    }

    async removeFromCart(productId, quantity) {
        return await this.cartRepository.removeFromCart(productId, quantity);
    }

    async clearCart(userId) {
        return await this.cartRepository.clearCart(userId);
    }

    async checkoutCart(userId, token, productList) {
        try {
            let response;
            try {
                response = await fetch(process.env.ORDER_SERVICE + '/' + userId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ productList })
                });
                if (!response.ok) {
                    throw new ServerError(500, 'Error checking out cart' );
                }
            }
            catch (e) {
                throw new ServerError(500, 'Error checking out cart')
            }           

            // this.clearCart(userId);
            return await response.json();
        }
        catch (e: any) {
            throw e;
        }
    }

}
