const ProductRepository = require('../../src/repository/product-repository');
const Product = require('../../src/entity/product');



test('checks if createProduct properly passes and returns given simple correct input2', async () => {
    jest.spyOn(Product, 'create').mockImplementation(newProduct => newProduct);

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

    expect(await ProductRepository.createProduct(input)).toStrictEqual(expectedResponse);
    expect(Product.create).toHaveBeenCalledWith(expectedResponse);
});

test('tests if getAllProducts properly passes and returns given simple correct input', async () => {
    jest.spyOn(Product, 'find').mockImplementation(() => {});
    
    expect(await ProductRepository.getAllProducts()).toStrictEqual(undefined);
});

test('tests if getProductById properly passes and returns given simple correct input', async () => {
    jest.spyOn(Product, 'find').mockImplementation(id => id);

    expect(await ProductRepository.getProductById(0)).toStrictEqual({ id: 0 });
});

test('tests if getProductsByType properly passes and returns given simple correct input', async () => {
    jest.spyOn(Product, 'find').mockImplementation(type => type);

    expect(await ProductRepository.getProductsByType('testType')).toStrictEqual({ type: 'testType' });
})

test('tests if getProductQuantity properly passes and returns given simple correct input', async () => {
    jest.spyOn(Product, 'find').mockImplementation(id => { return { quantity: 1}; });

    expect(await ProductRepository.getProductQuantity(0)).toStrictEqual(1);
})

test('tests if updateProduct properly passes and returns given simple correct input', async () => {
    const input = {
        id: 0,
        name: 'testProduct',
        price: '10.00'
    }

    const expectedResponse = {
        name: null,
        price: null,
        type: null,
        quantity: null,
        imagePaths: null,
        ...input
    };

    const { id: removedKey, ...updateOneSecondParameter } = expectedResponse;

    jest.spyOn(Product, 'updateOne')
        .mockImplementation(
            (id , productUpdate ) => {
                return { ...id, ...productUpdate };
            }
        );

    expect(await ProductRepository.updateProduct(input)).toEqual(expectedResponse);
    expect(Product.updateOne).toHaveBeenCalledWith({ id: input.id }, updateOneSecondParameter);
})

test('tests if deleteProductById properly passes and returns given simple correct input', async () => {
    jest.spyOn(Product, 'deleteOne').mockImplementation(id => id);

    expect(await ProductRepository.deleteProductById(0)).toStrictEqual({ id: 0 });
})

