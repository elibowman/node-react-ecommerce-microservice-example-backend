import express from "express";
import cors from "cors";
require('dotenv').config();
import setupLogging from './src/config/setup-logging';
import CartController from './src/controller/cart-controller';

const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);

const cartController = new CartController();

app.get(
    '/', 
    (req, res, next) => {
        next();
    },
    cartController.getAllCartEntries.bind(cartController)
);

app.get(
    '/:userId', 
    (req, res, next) => {
        next();
    },
    cartController.getCart.bind(cartController)
);

app.post(
    '/:userId', 
    (req, res, next) => {
        next();
    },
    cartController.checkoutCart.bind(cartController)
);

app.get(
    '/:userId/item/:productId', 
    (req, res, next) => {
        next();
    },
    cartController.getCartItem.bind(cartController)
);

app.post(
    '/', 
    (req, res, next) => {
        next();
    },
    cartController.addToCart.bind(cartController)
);

app.delete(
    '/:productId/quantity/:quantity', 
    (req, res, next) => {
        next();
    },
    cartController.removeFromCart.bind(cartController)
);


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))

export default app;