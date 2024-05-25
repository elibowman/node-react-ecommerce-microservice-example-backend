const Payment = require('../../src/entity/payment');
// const OrderRepository = require('../../src/repository/order-repository');
// const OrderService = require('../../src/service/payment-service');
const req = require('supertest');
const app = require('../../api');

afterEach(() => {
    jest.restoreAllMocks();
});

test('tests if getPaymentsByUserId() proxies to and from the repository layer', async () => {    
    jest.spyOn(Payment, 'findAll').mockImplementation(x => new Promise((resolve, reject) => {
        resolve(x);
    }));

    // jest.spyOn(OrderService, 'getOrdersByUserId').mockImplementation(input => new Promise((resolve, reject) => {
    //     resolve({
    //         where: {
    //             id: input
    //         }
    //     });
    // }));

    const input = 0;
    const expectedOutput = {
        where: {
            userId: input + "" //since req.body.params returns string params
        }
    }

    const res = await req(app).get('/user/' + input);
    expect(res.body).toStrictEqual(expectedOutput);
})

test('tests if getPaymentByOrderId() proxies to and from repository layer', async () => {
    jest.spyOn(Payment, 'findAll').mockImplementation(x => new Promise((resolve, reject) => {
        resolve(x);
    }));

    // jest.spyOn(OrderService, 'getOrdersByUserId').mockImplementation(input => new Promise((resolve, reject) => {
    //     resolve({
    //         where: {
    //             id: input
    //         }
    //     });
    // }));

    const input = 0;
    const expectedOutput = {
        where: {
            orderId: input + "" //since req.body.params returns string params
        }
    }

    const res = await req(app).get('/order/' + input);
    expect(res.body).toStrictEqual(expectedOutput);
})

test('tests if getAllPayments() proxies to and from repository layer', async () => {

    const input = 0;
    const expectedOutput = {
        output: 0
    }

    jest.spyOn(Payment, 'findAll').mockImplementation((x) => new Promise((resolve, reject) => {
        resolve(expectedOutput);
    }));

    const res = await req(app).get('/');
    expect(res.body).toStrictEqual(expectedOutput);
})

test('tests if createPayment() proxies to and from repository layer', async () => {
    
    const orderId = 0;
    const input = {
        paymentAmount: 0,
        userId: 0
    };

    jest.spyOn(Payment, 'create').mockImplementation((x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const expectedOutput = {
        orderId,
        ...input
    }

    const res = await req(app).post('/' + orderId).send(input);
    expect(res.body).toStrictEqual(input);
})