const ProductService = require('../../src/service/product-service');
const ProductRepository = require('../../src/repository/product-repository');



test('checks if createProduct properly passes and returns given simple correct input2', async () => {
    jest.spyOn(ProductRepository, 'createProduct').mockImplementation(newProduct => newProduct);

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

    expect(await ProductService.createProduct(input)).toStrictEqual(expectedResponse);
    expect(ProductRepository.createProduct).toHaveBeenCalledWith(expectedResponse);
});

test('tests if getAllProducts properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductRepository, 'getAllProducts').mockImplementation(() => {});
    
    expect(await ProductService.getAllProducts()).toStrictEqual(undefined);
});

test('tests if getProductById properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductRepository, 'getProductById').mockImplementation(id => id);

    expect(await ProductService.getProductById(0)).toBe(0);
});

test('tests if getProductsByType properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductRepository, 'getProductsByType').mockImplementation(type => type);

    expect(await ProductService.getProductsByType('testType')).toBe('testType');
})

test('tests if getProductQuantity properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductRepository, 'getProductQuantity').mockImplementation(id => id);

    expect(await ProductService.getProductQuantity(0)).toBe(0);
})

test('tests if updateProduct properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductRepository, 'updateProduct').mockImplementation(product => product);

    const input = {
        id: 0,
        name: 'testProduct',
        price: '10.00'
    }

    const expectedResponse = {
        ...input,
        type: null,
        quantity: null,
        imagePaths: null
    }

    expect(await ProductService.updateProduct(input)).toStrictEqual(expectedResponse);
    expect(ProductRepository.updateProduct).toHaveBeenCalledWith(expectedResponse);
})

test('tests if deleteProductById properly passes and returns given simple correct input', async () => {
    jest.spyOn(ProductRepository, 'deleteProductById').mockImplementation(id => id);

    expect(await ProductService.getProductQuantity(0)).toBe(0);
})