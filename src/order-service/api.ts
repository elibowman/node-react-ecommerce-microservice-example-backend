import express from "express";
import cors from "cors";
require('dotenv').config();
import setupLogging from './src/config/setup-logging';
import OrderController from './src/controller/order-controller';

const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);

const orderController = new OrderController();

app.get(
    '/user/:userId', 
    (req, res, next) => {
        next();
    },
    orderController.getOrdersByUserId.bind(orderController)
);

app.get(
    '/order/:orderId', 
    (req, res, next) => {
        next();
    },
    orderController.getOrderByOrderId.bind(orderController)
);

app.get(
    '/', 
    (req, res, next) => {
        next();
    },
    orderController.getAllOrders.bind(orderController)
);

app.post(
    '/:userId', 
    (req, res, next) => {
        next();
    },
    orderController.createOrder.bind(orderController)
);


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))

export default app;