import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class LoginUtils {

    static async areEmailAndPasswordValid(email: string, password: string) {
        const response = await fetch((process.env.USER_SERVICE + '/' + email), {});        
        if (!response.ok) {
            throw new Error('Error authenicating credentials');
        }

        const user = await response.json();

        return password === user[0].password;
    }

    static async getUser(email: string) {
        const response = await fetch((process.env.USER_SERVICE + '/' + email), {});
        if (!response.ok) {
            throw new Error('Error getting user');
        }
        return await response.json();
    }

    static async createUser(email: string, password: string) {
        const response = await fetch(
            process.env.USER_SERVICE + '/',
            { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    // 'authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ email, password }) 
            }

        );
        if (!response.ok) {
            throw new Error('Error creating user');
        }

        return await response.json();
    }

    static async isPasswordValid(passwordFromUserLogin: string, passwordFromDatabase: string) {
        return await bcrypt.compare(passwordFromUserLogin, passwordFromDatabase);
    }

    // static async generateResourceToken() {
        
    // }

    static async generateAccessToken(userId: number, email: string) {
        return jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET as string);
    }

    static async generateRefreshToken(userId: number, email: string) {
        return jwt.sign({ userId, email }, process.env.REFRESH_TOKEN_SECRET as string);
    }

    static async verifyToken(token: string, secret: string) {
        return jwt.verify(token, secret);
    }

    static async verifyAccessToken(token: string) {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    }
    
    static async verifyRefreshToken(token: string) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    }
}
