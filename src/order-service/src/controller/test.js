require('dotenv').config();
const OrderUtils = require('../utils/order-utils');

(async () => {
    const token = await OrderUtils.generateToken({ message: "hello" });

    console.log(token);

    console.log(await OrderUtils.verifyToken(token, process.env.ACCESS_TOKEN_SECRET));
})();