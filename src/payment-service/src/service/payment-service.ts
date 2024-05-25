import PaymentRepository from '../repository/payment-repository';

export default class PaymentService {

    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async getPaymentsByUserId(userId) {
        return await this.paymentRepository.getPaymentsByUserId(userId);
    }

    async getPaymentByOrderId(orderId) {
        return await this.paymentRepository.getPaymentByOrderId(orderId);
    }

    async getAllPayments() {
        return await this.paymentRepository.getAllPayments();
    }

    async createPayment({ orderId, paymentAmount, userId }) {
        return await this.paymentRepository.createPayment({
            orderId,
            paymentAmount,
            userId
        })
    }

}
