import { cartDao } from "../dao/factory.js";

export class CartsService{
    static getCarts = async ()=>{
        return  await cartDao.getCarts()
    }
    static saveCarts = async (cartInfo)=>{
        return  await cartDao.save(cartInfo);
    }
    static getCartById = async (cid)=>{
        return await cartDao.getCartById(cid);
    }

    static updateCart = async (cid, cart)=>{
        return await cartDao.update(cid, cart);
    }
    static addProductToCart = async (cid, productId)=>{
        return await cartDao.addCart(cid, productId);
    }
    static updateListCart = async (cid, products)=>{
        return await cartDao.addProductInCart(cid, products);
    }
    static deleteProductInCart = async (cid)=>{
        return  await cartDao.deleteProductInCart(cid, checkIdCart.products);
    }
    static deletCart = async (cid)=>{
        return  await cartDao.updateOneProduct(cid, cart.products);
    }
}