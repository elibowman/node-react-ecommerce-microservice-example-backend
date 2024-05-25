import ProductRepository from '../repository/product-repository';

export default class ProductService {

    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }
    
    async createProduct({ name, price, type, quantity, imagePaths }) {
        const product = {
            name: name,
            price: price,
            type: type,
            quantity: quantity,
            imagePaths: imagePaths
        }

        return await this.productRepository.createProduct(product);
    }

    async getAllProducts() {
        return await this.productRepository.getAllProducts();
    }

    async fillOrder(productList) {
        return await this.productRepository.fillOrder(productList);
    }

    async getProductById(id) {
        return await this.productRepository.getProductById(id);
    }

    async getProductsByType(type) {
        return await this.productRepository.getProductsByType(type);
    }

    async getProductQuantity(id) {
        return await this.productRepository.getProductQuantity(id);
    }

    async updateProduct({ id, name, price, type, quantity, imagePaths }) {
        const product = {
            id,
            name: name,
            price: price,
            type: type,
            quantity: quantity,
            imagePaths: imagePaths
        }
        return await this.productRepository.updateProduct(product);      
    }

    async deleteProductById(id) {
        return await this.productRepository.deleteProductById(id);
    }

}
