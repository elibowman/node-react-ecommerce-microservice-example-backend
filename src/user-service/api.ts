import express from "express";
import cors from "cors";
require('dotenv').config();
import setupLogging from './src/config/setup-logging';

import UserController from './src/controller/user-controller';

const app = express();

app.use(cors());
app.use(express.json());
setupLogging(app);

const userController = new UserController();

app.get('/', userController.getAllUsers.bind(userController));

app.get('/:email', (req, res, next) => {
        // res.json({ message: 'user-service /user/:userId'});
        next()
    },
    userController.getUser.bind(userController)
);

app.post(
    '/',
    (req, res, next) => {
        // res.json({ message: 'user-service /user'});
        next()
    },
    userController.createUser.bind(userController)
);

app.put('/', userController.updateUser.bind(userController));

app.delete('/', userController.deleteUser.bind(userController));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))