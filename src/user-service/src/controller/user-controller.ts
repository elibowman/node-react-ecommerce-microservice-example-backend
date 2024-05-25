import ClientError from '../error/client-error';
import { CustomError } from '../error/custom-error';
import UserService from '../service/user-service';

export default class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req, res, next) {
        try {

            if (req.body.email == null || req.body.password) {
                throw new ClientError(400, 'Email nor password can be null')
            }

            const User = await this.userService.createUser ({
                email: req.body.email,
                password: req.body.password,
                address: req.body.address || null,
                city: req.body.city || null,
                state: req.body.state || null,
                zip: req.body.zip || null
            })
        
            res.json(User);
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error creating user"});
            }
        }
    }

    async getUser(req, res, next) {
        try {
            if (req.params.email == null) {
                throw new ClientError(400, 'Email cannot be null')
            }

            res.json(await this.userService.getUser(req.params.email));
        } 
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error getting user"});
            }
        }
    }

    async getAllUsers(req, res, next) {
        res.json(await this.userService.getAllUsers());
    }

    async updateUser(req, res, next) {
        try {
            const User = await this.userService.updateUser(
                { 
                    email: req.body.email, 
                    password: req.body.password, 
                    address: req.body.address, 
                    city: req.body.city, 
                    state: req.body.state, 
                    zip: req.body.zip 
                },
                req.body.selector        
            );

            res.json(User);
        }
        catch(e: any) {
            console.log(e);
            res.status(500).json('Error updating user')
        }
    }

    async deleteUser(req, res, next) {
        try {
            if (req.body.email == null) {
                throw new ClientError(400, 'Email cannot be null');
            }

            const User = await this.userService.deleteUser(req.body.email);

            res.status(200);
        }
        catch (e: any) {
            console.log(e);

            if (e instanceof CustomError) {
                res.status(e.statusCode).json(e.serialize());
            }
            else {
                res.status(500).json({ error: "Error deleting user"});
            }
        }
    }
} 
