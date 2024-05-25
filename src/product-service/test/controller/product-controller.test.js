const ProductController = require('../../src/controller/product-controller');
const ProductService = require('../../src/service/product-service');
const request = require('supertest');
const app = require('../../api');

afterEach(() => {
    jest.restoreAllMocks();
});

test('checks if createProduct() properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'createProduct').mockImplementation(newProduct => newProduct);

    const input = {
        name: 'testProduct',
        price: '10.00'
    }

    const expectedResponse = {
        ...input,
        type: null,
        quantity: null,
        imagePaths: null
    }

    const req = {
        body: input,
    }

    const res = {
        json: x => x
    }

    jest.spyOn(res, 'json');

    await ProductController.createProduct(req, res, null);
    expect(res.json.mock.results[0].value).toStrictEqual(expectedResponse);
    expect(ProductService.createProduct).toHaveBeenCalledWith(expectedResponse);

    const response = await request(app).post('/').send(input);
    expect(response.body).toStrictEqual(expectedResponse);
});

test('tests if getAllProducts properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'getAllProducts').mockImplementation(() => {});

    const res = {
        json: x => x
    }
    
    expect(await ProductController.getAllProducts(null, res)).toStrictEqual(undefined);
});

test('tests if getProductById properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'getProductById').mockImplementation(id => id);

    const req = {
        params: {
            id: 0
        }
    };

    const res = {
        json: x => x
    }

    jest.spyOn(res, 'json');

    await ProductController.getProductById(req, res)
    expect(res.json.mock.results[0].value).toBe(0);
});

test('tests if getProductsByType properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'getProductsByType').mockImplementation(type => type);

    const req = {
        params: {
            type: 'testType'
        }
    };

    const res = {
        json: x => x
    }

    jest.spyOn(res, 'json');

    await ProductController.getProductsByType(req, res)
    expect(res.json.mock.results[0].value).toBe('testType');
})

test('tests if getProductQuantity properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'getProductQuantity').mockImplementation(id => id);

    const req = {
        params: {
            id: 0
        }
    };

    const res = {
        json: x => x
    }

    jest.spyOn(res, 'json');

    await ProductController.getProductQuantity(req, res)
    expect(res.json.mock.results[0].value).toBe(0);
})

test('tests if updateProduct properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'updateProduct').mockImplementation(product => product);

    const input = {
        name: 'testProduct',
        price: '10.00'
    }    

    const req = {
        params: {
            id: 0
        },
        body: input,
    }

    const res = {
        json: x => x
    }

    const expectedResponse = {
        id: req.params.id,
        ...input,
        type: null,
        quantity: null,
        imagePaths: null
    }

    jest.spyOn(res, 'json');

    await ProductController.updateProduct(req, res);
    expect(res.json.mock.results[0].value).toStrictEqual(expectedResponse);
    expect(ProductService.updateProduct).toHaveBeenCalledWith(expectedResponse);
})

test('tests if deleteProductById properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductService, 'deleteProductById').mockImplementation(id => id);

    const req = {
        params: {
            id: 0
        }
    }

    const res = {
        json: x => x
    }

    jest.spyOn(res, 'json');

    await ProductController.deleteProductById(req, res);
    expect(res.json.mock.results[0].value).toBe(0);
})