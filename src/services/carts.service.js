import { cartDao } from "../dao/index.js";

export class CartsService{
    static getCarts = async ()=>{
        return  await cartDao.getCarts()
    }
    static saveCarts = async ()=>{
        return  await cartDao.save();
    }
    static getCartById = async (cid)=>{
        return await cartDao.getCartById(cid);
    }
    static addProductToCart = async (cid, productId)=>{
        return await cartDao.addCart(cid, productId);
    }
    static updateListCart = async (cid, products)=>{
        return await cartDao.updateProductsInCart(cid, products);
    }
    static deleteProductInCart = async (cid)=>{
        return  await cartDao.deleteProductInCart(cid, checkIdCart.products);
    }
    static deletCart = async (cid)=>{
        return  await cartDao.updateOneProduct(cid, cart.products);
    }
}