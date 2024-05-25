import Payment from '../entity/payment';

export default class PaymentRepository {

    async getPaymentsByUserId(userId) {
        return await Payment.findAll({
            where: {
                userId
            }
        });
    }

    async getPaymentByOrderId(orderId) {
        return await Payment.findAll({
            where: {
                orderId
            }
        });
    }

    async getAllPayments() {
        return await Payment.findAll();
    }

    async createPayment({ orderId, paymentAmount, userId}) {
        return await Payment.create({
            orderId,
            paymentAmount,
            userId
        })
    }

}
