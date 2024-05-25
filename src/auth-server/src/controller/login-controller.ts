import { Request, Response } from 'express';
import LoginService from '../service/login-service';
import LoginUtils from '../util/login-utils';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import ClientError from '../error/client-error';
import ServerError from '../error/server-error';
import { CustomError } from '../error/custom-error';

export default class LoginController {

    loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();
    }

    async register(req: Request, res: Response, next: any) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (token == null) {
                throw new ClientError(400, 'Token not found');
            }

            if (req.body.email == null || req.body.password == null) {
                throw new ClientError(400, 'Email nor password can be null');
            }

            res.json(await this.loginService.register(req.body.email, req.body.password));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error Registering user"});
            }
        }
    }
    
    async createLogin(req: Request, res: Response, next: any) {
        try {
            if (req.body.email == null || req.body.password == null) {
                throw new ClientError(400, "Fill out the required fields")
            }

            res.json(await this.loginService.createLogin({ email: req.body.email, password: req.body.password }));
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize);
            }
            else {
                res.status(500).json({ error: "Error creating login"});
            }
        }
    }

    async getAllLogins(req: Request, res: Response, next: any) {
        try {
            res.json(await this.loginService.getAllLogins());
        }
        catch (e: any) {
            console.log(e);
            res.status(500).json({ error: 'Error getting logins'});
        }
    }

    async getLogin(req: Request, res: Response, next: any) {
        try {
            if (req.body.email == null) {
                throw new ClientError(400, "Fill out required fields")
            }

            res.json(await this.loginService.getLogin(req.body.email));
        }
        catch (e: any) {
            console.log(e);
            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize);
            }
            else {
                res.status(400).json({ error: "Invalid email"});
            }
        }
    }

    async updateLogin(req: Request, res: Response, next: any) {
        const login = await this.loginService.updateLogin({ 
            email: req.body.email, 
            token: req.body.token
        });
    }

    async deleteLogin(req: Request, res: Response, next: any) {
        res.json(await this.loginService.deleteLogin(req.body.email));
    }

    async verify(req: Request, res: Response, next: any) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (token == null) {
                throw new Error('Token not found');
            }
        
            res.json(await this.loginService.verify(token));
          
        }
        catch (e: any) {
            console.log(e);
            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize);
            }
            else {
                res.status(400).json({ error: "Error verifying token"});
            }
        }
    }
}
