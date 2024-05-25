import ClientError from '../error/client-error';
import { CustomError } from '../error/custom-error';
import PaymentService from '../service/payment-service';

export default class PaymentController {

    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    async getPaymentsByUserId(req, res, next) {
        try {
            if (req.params.id == null) {
                throw new ClientError(400, 'User ID cannot be null');
            }

            res.json(await this.paymentService.getPaymentsByUserId(req.params.userId));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error retrieving payments"});
            }
        }
    }

    async getPaymentByOrderId(req, res, next) {
        try {
            if (req.params.id == null) {
                throw new ClientError(400, 'User ID cannot be null');
            }

            res.json(await this.paymentService.getPaymentsByUserId(req.params.userId))
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error retrieving payments"});
            }
        }
    }

    async getAllPayments(req, res, next) {
        try {
            res.json(await this.paymentService.getAllPayments());
        }
        catch(e: any) {
            console.log(e);
            res.status(500).json({ error: 'Error getting payments' })
        }
    }

    async createPayment(req, res, next) {
        try {
            if (
                req.params.orderId == null ||
                req.body.paymentAmount == null ||
                req.body.userId == null
            ) {
                throw new ClientError(400, 'Unable to make payment. Missing parameters')
            }
                        
            res.json(await this.paymentService.createPayment({
                orderId: req.params.orderId,
                paymentAmount: req.body.paymentAmount,
                userId: req.body.userId
            }));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error creating payment"});
            }
        }
    }

}
