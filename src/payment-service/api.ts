import express from "express";
import cors from "cors";
require('dotenv').config();
import setupLogging from './src/config/setup-logging';
import PaymentController from './src/controller/payment-controller';

const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);

const paymentController = new PaymentController();

app.get(
    '/user/:userId', 
    (req, res, next) => {
        next();
    },
    paymentController.getPaymentsByUserId.bind(paymentController)
);

app.get(
    '/order/:orderId', 
    (req, res, next) => {
        next();
    },
    paymentController.getPaymentByOrderId.bind(paymentController)
);

app.get(
    '/', 
    (req, res, next) => {
        next();
    },
    paymentController.getAllPayments.bind(paymentController)
);

app.post(
    '/:orderId', 
    (req, res, next) => {
        next();
    },
    paymentController.createPayment.bind(paymentController)
);


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))

module.exports= app;