// import { cartDao } from "../dao/factory.js";

// export class CartsService{
//     static getCarts = async ()=>{
//         return  await cartDao.getCarts()
//     }
//     static createCarts = async (cart)=>{
//         return  await cartDao.createCarts(cart);
//     }
//     static resolveCart = async(cid,cart)=>{
//         return await cartDao.update(cid,cart);
//     };
//     static getCartById = async (cid)=>{
//         return await cartDao.getCartById(cid);
//     }

//     static updateCart = async (cid, cart)=>{
//         return await cartDao.update(cid, cart);
//     }
//     static addProductToCart = async (cid, productId)=>{
//         return await cartDao.addCart(cid, productId);
//     }
//     static updateListCart = async (cid, products)=>{
//         return await cartDao.addProductInCart(cid, products);
//     }
//     static deleteProductInCart = async (cid)=>{
//         return  await cartDao.deleteProductInCart(cid, checkIdCart.products);
//     }
//     static deletCart = async (cid)=>{
//         return  await cartDao.updateOneProduct(cid, cart.products);
//     }
// }

import { ProductsService } from "./products.service.js"

export class CartsService {
    constructor(dao, model) {
        this.dao = dao
        this.model = model
    }

    createCart = async() => {
        
        return await this.dao.post({},this.model)
        // return true 
    }

    getCart = async (params) =>{

        const getAll = await this.dao.get(params,this.model)
        if(getAll != '') return getAll
        return false
    }

    AddToCart = async (cId, pId) =>{

        const product = await ProductsService.getProducts({_id:pId})
        const cart = await this.dao.get({_id:cId}, this.model)

        if(product != '' && cart != ''){
            console.log(cart[0]);
            
            let exist = cart[0].products.find(element=>element._id._id == pId)

            if(!exist){
                let obj = {_id:pId, quantity: 1}
                await this.dao.update({_id:cId},{products:[...cart[0].products, obj]}, this.model)
                return true
            }

            exist.quantity++
            await this.dao.update({_id:cId},{products:[...cart[0].products]},this.model)
            return true
        }

        return false
    }

    DeleteProduct = async (cId,pId) =>{

        const cartById = await this.dao.get({_id:cId},this.model)
        
        if(cartById == '') return false
        
        const findItem = cartById[0].products.find((item)=> item._id._id == pId)

        if(cartById[0].products==[] || !findItem) return false
        
        const filterCart = cartById[0].products.filter((item)=> item._id._id != pId)
        await this.dao.update({_id:cId},{products:filterCart}, this.model)

        
        return true
    }

    DeleteAllProducts = async (cId) =>{
        
        const cartById = await this.dao.get({_id:cId}, this.model)
        
        if(cartById == null) return false
    
        await this.dao.update({_id:cId},{products:[]}, this.model)

        return true
    }

    UpdateCart = async (cId,productos) =>{

            const cartById = await this.dao.get({_id:cId}, this.model)
            
            if(cartById == null) return false

            await this.dao.update({_id:cId},{products:productos}, this.model)

            return true
    }

    UpdateProductQuantity = async (cId,pId,qty) =>{
        
            const cartById = await this.dao.get({_id:cId}, this.model)
            
            if(cartById == null) return false

            let element = cartById[0].products.find((item)=> item._id._id == pId)

            if(!element) return false

            element.quantity=qty
            await this.dao.update({_id:cId},{products:[...cartById[0].products]}, this.model)

            return true
    }
}