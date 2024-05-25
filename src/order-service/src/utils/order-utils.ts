import jwt from 'jsonwebtoken';

export default class OrderUtils {    

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

    static async getProductsForOrder(productList, token) {
        const response = await fetch(
            process.env.PRODUCT_SERVICE + '/fill-order',
            { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },                
                body: JSON.stringify({ productList }) 
            }

        );

        return await response.json();
    }

    static async makePayment(token, orderId, paymentAmount, userId, dummyCardNumber?) {
        const body = {
            paymentAmount,
            userId,
            dummyCardNumber
        }
        
        const response = (
            await fetch(
                process.env.PAYMENT_SERVICE + '/' + orderId,
                { 
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(body) 
                }
            )
        );
        return await response.json();
    }

}
