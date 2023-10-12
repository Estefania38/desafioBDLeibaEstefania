import { productDao } from "../dao/index.js";

export class ProductsService {
    static getProducts = async () => {
        return await productDao.getProducts();
    }
    static getProductById = async (productId) => {
        return await productDao.getProductById(productId);
    }
    static createdProduct = async (product) => {
        return await productDao.saveProduct(product);
    }
    static updateProduct = async (productId, updatedFields) => {
        return await productDao.updateProduct(productId, updatedFields);
    }
    static deleteProduct = async (productId) => {
        return await productDao.deleteProduct(productId);
    }
}
