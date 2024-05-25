const CartRepository = require('../../src/repository/cart-repository');
const Cart = require('../../src/entity/cart');
// const sequelize = require('../../db');

afterEach(() => {
    jest.restoreAllMocks();
});

// afterAll(async () => {
//     await sequelize.close();
// });

test('tests if getAllCartEntries() proxies back and forth correctly', async () => {
    jest.spyOn(Cart, 'findAll').mockImplementation(async () => new Promise((resolve, reject) => {
        resolve(0);
    }));

    expect(await CartRepository.getAllCartEntries()).toStrictEqual(0);
});

test('tests if getCart() proxies back and forth correctly', async () => {
    jest.spyOn(Cart, 'findAll').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const input = 0;
    const expectedOutput = {
        where: {
            userId: input
        }
    };

    expect(await CartRepository.getCart(input)).toStrictEqual(expectedOutput);
});

test('tests if addToCart() proxies back and forth correctly', async () => {
    jest.spyOn(Cart, 'create').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const input = {
        userId: 0,
        token: null,
        productId: 0
    }

    expect(await CartRepository.addToCart(input)).toStrictEqual(input);
});


test('tests if removeFromCart() proxies back and forth correctly', async () => {
    jest.spyOn(Cart, 'destroy').mockImplementation(async (x) => new Promise((resolve, reject) => {
        resolve(x);
    }));

    const productId = 0;
    const quantity = 0;

    const expectedOutput = {
        where: {
            productId
        },
        limit: quantity
    }

    expect(await CartRepository.removeFromCart(productId, quantity)).toStrictEqual(expectedOutput);
});