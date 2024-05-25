import LoginRepository from '../repository/login-repository';
import LoginUtils from '../util/login-utils';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { CustomError } from '../error/custom-error';
import ClientError from '../error/client-error';
import ServerError from '../error/server-error';

export default class LoginService {

    private loginRepository: LoginRepository;

    constructor() {
        this.loginRepository = new LoginRepository();
    }

    async register(email: string, password: string) {
        try {
            let user = null;
            user = await LoginUtils.getUser(email);

            if (user != null) {
                throw new ClientError(400, 'Email is already registered');
            }
            
            const response = await LoginUtils.createUser(email, password);
        }
        catch (e: any) {        
            throw e;
        }
    }
    
    async createLogin({ email, password }: { email: string, password: string}) {
        try {
            const user = await LoginUtils.getUser(email);

            if (user == null) {
                throw new ClientError(400, 'Invalid credentials');
            }
            
            if (await LoginUtils.isPasswordValid(password, user[0].password)) {

                const refreshToken = await LoginUtils.generateRefreshToken(user[0].id, email);

                await this.deleteLogin(user[0].email);

                const login = await this.loginRepository.createLogin ({
                        email: email,
                        token: refreshToken,
                });

                if (login == null) {
                    throw new ServerError(500, 'Error creating login')
                }

                return(
                    {
                        userId: user[0].id,
                        refreshToken, 
                        accessToken: await LoginUtils.generateAccessToken(user[0].id, email) 
                    }
                );
            }
            else {
                throw new ClientError(400, 'Invalid credentials');
            }
        }
        catch (e: any) {
            throw e
        }
    }

    async getAllLogins() {
        return await this.loginRepository.getAllLogins();
    }

    async getLogin(email: string) {
        return await this.loginRepository.getLogin(email);
    }

    async updateLogin({ email, token }: { email: string, token: string}) {
        return await this.loginRepository.updateLogin({ 
            email, 
            token
        });
    }

    async deleteLogin(email: string) {
        return await this.loginRepository.deleteLogin(email);
    }

    async verify(token: string) {
        return await LoginUtils.verifyAccessToken(token);
    }
}
