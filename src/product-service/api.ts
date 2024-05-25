import express from "express";
import cors from "cors";
require('dotenv').config();
import setupLogging from './src/config/setup-logging';
import ProductController from './src/controller/product-controller';

const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);

const productController = new ProductController();

app.get(
    '/', 
    (req, res, next) => {
        next();
    },
    productController.getAllProducts.bind(productController)
);
app.post(
    '/',
    (req, res, next) => {
        next();
    },
    productController.createProduct.bind(productController)
)
app.post(
    '/fill-order',
    (req, res, next) => {
        next();
    },
    productController.fillOrder.bind(productController)
)
app.get(
    '/:id', 
    (req, res, next) => {
        next();
    },
    productController.getProductById.bind(productController)
);
app.get(
    '/type/:type', 
    (req, res, next) => {
        next();
    },
    productController.getProductsByType.bind(productController)
);
app.get(
    '/:id/quantity',
    (req, res, next) => {
        next();
    },
    productController.getProductQuantity.bind(productController)
)
app.put(
    '/:id',
    (req, res, next) => {
        next();
    },
    productController.updateProduct.bind(productController)
)
app.delete(
    '/:id',
    (req, res, next) => {
        next();
    },
    productController.deleteProductById.bind(productController)
)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))

export default app;