// import { ticketsDao } from "../dao/factory.js";

// export class TicketsService {
    
//     static async createTicket(ticketInfo){
//         return await ticketsDao.createTicket(ticketInfo);
//     };
// };


import { ProductsService } from "./products.service.js"
import {UsersService } from "./users.service.js"
import { CartsService} from "./carts.service.js"


export class TicketsService {
    constructor(dao, model) {
        this.dao = dao
        this.model = model
    }


    createTicket = async(cId)=>{
        const carrito = await CartsService.GetCarts({_id:cId})
        let productsMap = []
        
        if(carrito[0].products=='') return false

        carrito[0].products.forEach(element => {
            productsMap.push({...element._id, quantity:element.quantity})
        });

        const comprados=[]
        const devueltos=[]
        let totalPrice = 0

        productsMap.forEach(element=>{
            if(element.stock > element.quantity){
                comprados.push({
                    _id:element._id, 
                    stock:element.stock-element.quantity, 
                })
                totalPrice+= element.quantity*element.price
            }else{
                devueltos.push({
                    _id:element._id,
                    quantity:element.quantity
                })

            }
        })


        comprados.forEach(async element => {
            await ProductsService.updateProduct(element._id, {stock:element.stock})
        });

        await CartsService.UpdateCart(cId,devueltos)

        const purchaser = await UsersService.getUsers({cart:cId})


        return await this.dao.post({
            code:Math.trunc(Math.random()*1000000),
            amount: totalPrice,
            purchaser:purchaser[0].email
        }, this.model)

        

    }
}