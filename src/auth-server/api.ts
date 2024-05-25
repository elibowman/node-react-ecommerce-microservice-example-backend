import express from "express";
import cors from "cors";
import 'dotenv/config'
import setupLogging from './src/config/setup-logging';
import LoginController from './src/controller/login-controller';
import LoginUtils from "./src/util/login-utils";

const app = express();

app.use(cors());
app.use(express.json())
setupLogging(app);

const loginController = new LoginController();

app.get('/register', (req, res, next) => {
    loginController.register.bind(loginController);
});

app.get('/login', (req, res, next) => {
        // res.json({ message: '/login'});
        next()
    },
    loginController.getAllLogins.bind(loginController) 
);

app.get('/login/:email', (req, res, next) => {
        // res.json({ message: '/login'});
        next()
    },
    loginController.getLogin.bind(loginController)
);

app.post('/login', (req, res, next) => {
        next()
    },
    loginController.createLogin.bind(loginController)
)

app.delete('/login', (req, res, next) => {
        next()
    },
    loginController.deleteLogin.bind(loginController)
)

app.post('/verify', loginController.verify.bind(loginController));

app.post('/token', (req, res, next) => {
    res.json({ message: '/token'});
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on ${PORT}.`))