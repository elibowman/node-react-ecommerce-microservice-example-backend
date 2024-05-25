import ClientError from '../error/client-error';
import { CustomError } from '../error/custom-error';
import ServerError from '../error/server-error';
import orderRepository from '../repository/order-repository';
import OrderService from '../service/order-service';
import OrderUtils from '../utils/order-utils';
import orderUtils from '../utils/order-utils';
import fetch from 'node-fetch';

export default class OrderController {

    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async getOrdersByUserId(req, res, next) {
        res.json(await this.orderService.getOrdersByUserId(req.params.userId));
    }

    async getOrderByOrderId(req, res, next) {
        res.json(await this.orderService.getOrderByOrderId(req.params.orderId));
    }

    async getAllOrders(req, res, next) {
        res.json(await this.orderService.getAllOrders());
    }

    async createOrder(req, res, next) {
        
        try {
        
            const TAX_RATE = 0.05;
            
            const token = req.headers.authorization?.split(' ')[1];
            let tokenPayload;
            try {
                tokenPayload = await orderUtils.verifyToken(token);
                if (tokenPayload == null || req.params.userId != tokenPayload.userId) {
                    throw new ClientError(400, 'Invalid token');
                }
            }
            catch {                
                throw new ClientError(400, 'Invalid token');
            }
            
            let orderItems;
            try {
                orderItems = await orderUtils.getProductsForOrder(req.body.productList, token);
            }
            catch {
                throw new ServerError(500, 'Unable to get products for order');
            }

            if (orderItems[0]?.error != null) {
                throw new Error(orderItems.error.message);
            }
            if (orderItems == null) {
                throw new ServerError(500, 'Unable to get products for order');
            }

            let subTotal
            try {
                subTotal = await orderItems.reduce(
                    (accumulatedValue, currentValue) => {
                        return accumulatedValue + currentValue.price * currentValue.quantity;
                    },
                    0
                )
            }
            catch {
                throw new ServerError(500, 'Error calculating subtotal')
            }

            const order = {
                userId: tokenPayload.userId,
                preTotal: subTotal,
                tax: TAX_RATE,
                total: subTotal + (subTotal * TAX_RATE),
                state: 'PENDING'
            }

            let createOrderResponse;
            try {
                createOrderResponse = await this.orderService.createOrder(order);
            }
            catch {
                throw new ServerError(500, 'Error creating order')
            }

            // adds orderId
            orderItems = orderItems?.map(
                orderItem => {
                    return {
                        orderId: createOrderResponse.id,
                        ...orderItem
                    }
                }
            )
            
            const addOrderItemsResponse = await this.orderService.addOrderItems(orderItems);

            if (addOrderItemsResponse == null) {
                await this.orderService.updateOrder({ state: 'FAILED'}, { orderId: createOrderResponse.id })
                throw new ServerError(500, 'Unable to add order Items');
            }

            const makePaymentResponse = await OrderUtils.makePayment(token, createOrderResponse.id, subTotal, createOrderResponse.userId);
            if (makePaymentResponse == null) {
                try {
                    console.log(await this.orderService.updateOrder({ state: 'FAILED'}, { id: createOrderResponse.id }));
                    console.log('updated order');
                }
                catch {
                    throw new ServerError(500, 'Payment failed and unable to set order to failed status');
                }
                throw new ServerError(500, 'Unable to make payment');
            }

            try {
                await this.orderService.updateOrder({ state: 'PROCESSED'}, { id: createOrderResponse.id });
                
                res.json(await this.orderService.getOrderByOrderId(createOrderResponse.id));
            }
            catch (e) {
                console.log(e);
                throw new ServerError(500, 'Failed to created order');
            }
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error creating order"});
            }
        }
                
    }

    async getOrderItemsByOrderId(req, res, next) {
        res.json(await this.orderService.getOrderItemsByOrderId(req.params.orderId));
    }

}
