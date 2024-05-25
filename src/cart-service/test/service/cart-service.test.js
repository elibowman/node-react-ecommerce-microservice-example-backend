const CartService = require('../../src/service/cart-service');
const CartRepository = require('../../src/repository/cart-repository');
// const sequelize = require('../../db');

afterEach(() => {
    jest.restoreAllMocks();
});

// afterAll(async () => {
//     await sequelize.close();
// });

test('tests if getAllCartEntries() proxies back and forth correctly', async () => {
    jest.spyOn(CartRepository, 'getAllCartEntries').mockImplementation(async () => new Promise((resolve, reject) => {
        resolve(0);
    }));

    expect(await CartService.getAllCartEntries()).toStrictEqual(0);
});

test('tests if getCart() proxies back and forth correctly', async () => {
    jest.spyOn(CartRepository, 'getCart').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const input = 0;

    expect(await CartService.getCart(input)).toStrictEqual(input);
});

test('tests if addToCart() proxies back and forth correctly', async () => {
    jest.spyOn(CartRepository, 'addToCart').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const input = {
        userId: 0,
        token: null,
        productId: 0
    }

    expect(await CartService.addToCart(input)).toStrictEqual(input);
});


test('tests if removeFromCart() proxies back and forth correctly', async () => {
    jest.spyOn(CartRepository, 'removeFromCart').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const productId = 0;
    const quantity = 0;

    expect(await CartService.removeFromCart(productId, quantity)).toStrictEqual(productId, quantity);
});