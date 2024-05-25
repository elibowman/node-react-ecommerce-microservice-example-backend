import OrderRepository from '../repository/order-repository';

export default class OrderService {

    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async getOrdersByUserId(userId) {
        return await this.orderRepository.getOrdersByUserId(userId);
    }

    async getOrderByOrderId(orderId) {
        return await this.orderRepository.getOrderByOrderId(orderId);
    }

    async getAllOrders() {
        return await this.orderRepository.getAllOrders();
    }

    async createOrder({ userId, preTotal, tax, total, state, paymentId }: { userId: number, preTotal: number, tax: number, total: number, state?: string, paymentId?: number }) {
        return await this.orderRepository.createOrder({
            userId,
            preTotal,
            tax,
            total,
            state,
            paymentId
        })
    }

    async getOrderItemsByOrderId(orderId) {
        return await this.orderRepository.getOrderItemsByOrderId(orderId);
    }
    
    async addOrderItems(orderItems) {
        return await this.orderRepository.addOrderItems(orderItems);
    }

    async updateOrder(update, selector) {
        return await this.orderRepository.updateOrder(update, selector);
    }
}
