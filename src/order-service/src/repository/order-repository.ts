import { Order, OrderItem } from '../entity/order';

export default class OrderRepository {

    async getOrdersByUserId(userId) {
        return await Order.findAll({
            where: {
                userId
            }
        });
    }

    async getOrderByOrderId(orderId) {
        return await Order.findAll({
            where: {
                id: orderId
            }
        });
    }

    async getAllOrders() {
        return await Order.findAll();
    }

    async createOrder({ userId, preTotal, tax, total, state, paymentId }) {
        
        // console.log({
        //     userId,
        //     preTotal,
        //     tax,
        //     total,
        //     state,
        //     paymentId
        // });
        
        return await Order.create({
            userId,
            preTotal,
            tax,
            total,
            state,
            paymentId
        })
    }

    async updateOrder(update, selector) {
        return await Order.update(
            update,
            { where: selector }
        );
    }

    async doesOrderContainItem(orderId, productId) {
        return !(
            (await OrderItem.findAll(
                {
                    where: {
                        orderId,
                        productId
                    }
                }
            ))
            == 
            null
        );
    }

    async getOrderItemsByOrderId(orderId) {
        const orderItems = await OrderItem.findAll({
            where: {
                orderId
            }
        });
    }

    async getOrderItemsByUserId(userId) {
        const orderItems = await OrderItem.findAll({
            where: {
                userId
            }
        });
    }

    async addOrderItems(orderItems) {
        orderItems.forEach(async orderItem => {
            if (await this.doesOrderContainItem(orderItem.orderId, orderItem.productId)) {
                return;
            }
            const addedOrderItem = await Order.create(orderItem);
        })
        return 'Success';
    }
}

module.exports = OrderRepository;