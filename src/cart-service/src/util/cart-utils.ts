import jwt from 'jsonwebtoken';

export default class CartUtils {
    static async generateToken(payload) {
        return await jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET as string);
    }

    static async verifyToken(token) {

        // return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const response = await fetch(
            process.env.AUTH_SERVER + '/verify',
            { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                }
            }
        );

        return await response.json();
    }
}
