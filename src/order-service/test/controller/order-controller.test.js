const Order = require('../../src/entity/order');
const OrderRepository = require('../../src/repository/order-repository');
const OrderService = require('../../src/service/order-service');
const req = require('supertest');
const app = require('../../api');

afterEach(() => {
    jest.restoreAllMocks();
});

test('tests if getOrdersByUserId() proxies to and from the repository layer', async () => {
    jest.spyOn(Order, 'findAll').mockImplementation(x => new Promise((resolve, reject) => {
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

test('tests if getOrdersByOrderId() proxies to and from repository layer', async () => {
    jest.spyOn(Order, 'findAll').mockImplementation(x => new Promise((resolve, reject) => {
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

test('tests if getAllOrders() proxies to and from repository layer', async () => {

    const input = 0;
    const expectedOutput = {
        output: 0
    }

    jest.spyOn(Order, 'findAll').mockImplementation((x) => new Promise((resolve, reject) => {
        resolve(expectedOutput);
    }));

    const res = await req(app).get('/');
    expect(res.body).toStrictEqual(expectedOutput);
})

test('tests if createOrder() proxies to and from repository layer', async () => {
    const input = {
        userId: 0,
        total: 0,
        paymentId: 0
    };

    jest.spyOn(Order, 'create').mockImplementation((x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const res = await req(app).post('/').send(input);
    expect(res.body).toStrictEqual(input);
})