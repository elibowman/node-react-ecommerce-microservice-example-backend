// const CarController = require('../../src/service/cart-service');
const CartService = require('../../src/service/cart-service');
// const sequelize = require('../../db');
const req = require('supertest'); // for request
const app = require('../../api');

afterEach(() => {
    jest.restoreAllMocks();
});

// afterAll(() => {
//     app.close();
// });

test('tests if getAllCartEntries() proxies back and forth correctly', async () => {
    jest.spyOn(CartService, 'getAllCartEntries').mockImplementation(async () => new Promise((resolve, reject) => {
        resolve(0);
    }));

    const res = await req(app).get('/');
    expect(res.body).toStrictEqual(0);
});

test('tests if getCart() proxies back and forth correctly', async () => {
    jest.spyOn(CartService, 'getCart').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const res = await req(app).get('/0');
    expect(res.body).toStrictEqual('0');
});

test('tests if addToCart() proxies back and forth correctly', async () => {
    jest.spyOn(CartService, 'addToCart').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const input = {
        userId: 0,
        token: null,
        productId: 0
    }

    const res = await req(app).post('/').send(input);
    expect(res.body).toStrictEqual(input);

});


test('tests if removeFromCart() proxies back and forth correctly', async () => {
    jest.spyOn(CartService, 'removeFromCart').mockImplementation(async (productId, quantity) => new Promise((resolve, reject) => {
        resolve({
            productId: 0,
            quantity: 0
        });
    }));

    const productId = 0;
    const quantity = 0;

    const res = await req(app).delete('/' + productId + '/quantity/' + quantity)
    expect(res.body)
        .toStrictEqual({
            productId,
            quantity
        });

});