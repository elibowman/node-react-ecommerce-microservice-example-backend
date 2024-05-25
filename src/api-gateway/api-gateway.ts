import express from "express";
import cors from "cors";
require('dotenv').config();
import routes from './src/config/routes';
import setupLogging from './src/config/setup-logging';
import setupProxies from './src/config/setup-proxies';

const app = express();

console.log(routes);

app.use(cors());
setupLogging(app);
setupProxies(app, routes.serviceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))