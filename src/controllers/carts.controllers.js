// import { CartsService } from "../services/carts.service.js";
// import { ProductsService } from "../services/products.service.js";
// import { BusinessService } from "../services/business.service.js";
// import { UsersService } from "../services/users.service.js";
// import {TicketsService} from "../services/tickets.service.js"
// export class CartsController {

//     static getCarts = async(req, res)=>{
//         try {
//             const carts = await CartsService.getCarts();
//             res.json({status:"success", data:carts});
//         } catch (error) {
//             console.log(error.menssage)
//             res.json({status:"error", message:"hubo un error al listar los carritos"})
//         }
//     }  


//     static createCarts = async(req,res)=>{
//         try {
//             const {cartNumber, userId, businessId, products } = req.body;
//             const user = await UsersService.getById(userId);
//             const business = await BusinessService.getBusinessById(businessId);
//             //obtenemos los productos del negocio con su id y precio.
//             const productsCart = business.products.filter(product=>products.includes(product.id));
//             //calculamos el total del pedido
//             const total = productsCart.reduce((acc,i)=>acc = acc+i.price, 0 );
//             //creamos la orden
//             const newCart = {
//                 cartNumber: cartNumber,
//                 business: businessId,
//                 user:userId,
//                 products:productsCart.map(p=>p.id),
//                 totalPrice:total,
//                 status: "pendiente"
//             }
//             //creamos la orden en la base de datos
//             const cartCreated = await CartsService.createCarts(newCart);
//             //actualizamos el usuario con la orden
//             // user.cart.push(cartCreated._id);
//             // const userUpdate = await UsersService.updateUser(userId, user);
//              res.send({status:"success", result: cartCreated});
//         } catch (error) {
           
//             console.log(error);
//             res.status(400).json({status:"error", message:error.message});
//         }
//     };

//     static resolveOrderCart = async(req,res)=>{
//         try {
//             const cartId = req.params.cid;
//             const cart = await CartsService.getCartById (cartId);
//             cart.status="completada";
//             await CartsService.resolveCart (cid,cart);
//             res.send({status:"success", result:"orden de carrito completada"});
//         } catch (error) {
//             console.log(error);
//             res.status(400).json({status: "error", message:error.message});
//         }
//     };





//     //////////////////////////////////////////////////
//     static getCartById = async (req, res) => {
//         const cid = req.params.cid;
//         const cart = await CartsService.getCartById(cid);
//         if (cart) {
//             res.json({ status: "success", data: cart.products });
//         } else {
//             res.status(404).json({ status: "error", message: "Carrito no encontrado" });
//         }
//     }
//     static addProductToCart = async (req, res) => {
//         try{      
//         const cid = req.params.cid;
//         const productId = req.params.pid;
//         const cart = await CartsService.getCartById(cid);
//         const product = await ProductsService.getProductById(productId);
//         const productExist = cart.products.find(product=>product._id === productId);
//         console.log("productExist",productExist);
//         const newProduct = {
//             _id:productId,
//             quantity:1
//         }
//         cart.products.push(newProduct);
//         const cartUpdated = await CartsService.updateCart(cid, productId);
//             res.json({ status: "success", message: "Producto agregado al carrito", data:cartUpdated });
//         } catch (error) {
//             res.status(404).json({ status: "error", message: error.message });
//         }
//     }

//     // ENDPOINT que actualiza la lista de productos en el carrito  
//     static updateListCart = async (req, res) => {
//         try {
//             const { cid } = req.params;
//             const { products } = req.body;
//             // Verificar si todos los productos existen antes de actualizar el carrito
//             for (const product of products) {
//                 const checkId = await ProductsService.getProductById(product._id);
//                 if (!checkId) {
//                     return res.status(404).send({ status: 'error', message: `The ID product: ${product._id} not found` });
//                 }
//             }
//             // Verificar si el carrito con el ID cid existe
//             const checkIdCart = await CartsService.getCartById(cid);
//             if (!checkIdCart) {
//                 return res.status(404).send({ status: 'error', message: `The ID cart: ${cid} not found` });
//             }
//             // Actualizar el carrito en la base de datos con la lista de productos actualizada
//             const cart = await CartsService.updateListCart(cid, products);
//             return res.status(200).send({ status: 'success', payload: cart });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
//         }
//     }
//     static deleteProductInCart = async (req, res) => {
//         try {
//             // Extraer los parámetros de la URL: cid (ID del carrito) y pid (ID del producto)
//             const { cid, pid } = req.params;
//             // Verificar si el producto con el ID pid existe
//             const checkIdProduct = await ProductsService.getProductById(pid);
//             if (!checkIdProduct) {
//                 return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found` });
//             }
//             // Verificar si el carrito con el ID cid existe
//             const checkIdCart = await CartsService.getCartById(cid);
//             if (!checkIdCart) {
//                 return res.status(404).send({ status: 'error', message: `Cart with ID: ${cid} not found` });
//             }
//             // Buscar el índice del producto en la lista de productos del carrito
//             const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
//             if (findProductIndex === -1) {
//                 return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
//             }
//             // Eliminar el producto de la lista de productos del carrito
//             checkIdCart.products.splice(findProductIndex, 1);
//             // Actualizar el carrito en la base de datos sin el producto eliminado
//             // revisar el llamado si esta correcto en CartService
//             const updatedCart = await CartsService.deleteProductInCart(cid, checkIdCart.products);
//             return res.status(200).send({ status: 'success', message: `Eliminar producto con  ID: ${pid}`, cart: updatedCart });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send({ status: 'error', message: 'Ocurrio un error en ek proceso de request' });
//         }
//     }
//     static deleteCart = async (req, res) => {
//         try {
//             const { cid } = req.params;
//             const cart = await CartsService.getCartById(cid);
//             if (!cart) {
//                 return res.status(404).send({ message: `Carrito con ID: ${cid} no encontrado` });
//             }
//             if (cart.products.length === 0) {
//                 return res.status(404).send({ message: 'El carrito esta vacio' });
//             }
//             // Vaciar el carrito estableciendo la propiedad 'products' como un arreglo vacío.
//             cart.products = [];
//             await CartsService.updateOneProduct(cid, cart.products);
//             return res.status(200).send({
//                 status: 'success',
//                 message: `El carro con ID: ${cid} fue borrado correctamente`,
//                 cart: cart,
//             });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send({ message: 'Ocurrio un error en el proceso de request' });
//         }
//     }
// }


import { TicketsService } from "../services/tickets.service.js";
import {CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";


// CONTROLLER (POST) PARA CREAR UN NUEVO CARRITO
    export const createCart= async (req,res) => {
        //---------------LOGICA----------------------
        CartsService.createCart()

        //---------------RESPUESTA-------------------
            return res.status(201).send({
                status: 'success',
                message: 'nuevo carrito creado con exito'
            })
        
    }

// CONTROLLER (GET) PARA TRAER EL CARRITO POR SU ID
    export const getCartByID = async (req,res)=> {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const carrito = await CartsService.GetCart({_id:cid})

        //---------------RESPUESTA-------------------
            if(carrito==false){
                return res.status(404).send({
                    status: 'error',
                    message: `Carrito ${cid} no existe`
                })
            }

            return res.status(200).send({
                status:'success',
                payload: carrito
            })
    }

// CONTROLLER (POST) PARA AGREGAR UN PRODUCTO AL CARRITO
    export const addToCartByID = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const pid = req.params.pid
            let producto = await ProductsService.getProducts({_id:pid})

            if(producto[0].owner==req.user.user.email){
                return res.status(400).send({
                    status: 'error',
                    message: `no puedes agregar un producto propio al carrito`
                })
            }

            let action = await CartsService.AddToCart(cid,pid)
        
        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: `carrito ${cid} o producto ${pid} no existe`
                })
            }

            return res.redirect(`http://localhost:8080/carts/${cid}`)
    }

// CONTROLLER (DELETE) PARA ELIMINAR UN PRODUCTO EN EL CARRITO
    export const deleteProductInCart = async (req,res) => {

        //---------------LOGICA----------------------
            const pid = req.params.pid
            const cid = req.params.cid
            
            const action = await CartsService.DeleteProduct(cid,pid)

        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'producto o carrito no existe'
                })
            }

            return res.status(200).send({
                status: 'success',
                message: 'producto eliminado con exito'
            })
    }

// CONTROLLER (DELETE) PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
    export const deleteAllProducts = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            
            const action = await CartsService.DeleteAllProducts(cid)

        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'producto o carrito no existe'
                })
            }
            
            return res.status(200).send({
                status: 'success',
                message: 'productos eliminados con exito'
            })
    }

// CONTROLLER (PUT) PARA MODIFICAR TODO EL CARRITO
    export const UpdateAllCart = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const products = req.body

            let action = await CartsService.UpdateCart(cid,products)
            
        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'error en actualizar'
                })}

            return res.status(201).send({
                status: 'success',
                message: 'productos actualizados con exito'
            })

    }

// CONTROLLER (PUT) PARA ACTUALIZAR LA CANTIDAD DE UN PRODUCTO
    export const UpdateProductQty = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid
            const pid = req.params.pid
            const qty = req.body

            let action = await CartsService.UpdateProductQuantity(cid,pid,qty.quantity)

        //---------------RESPUESTA-------------------
            if(action===false){
                return res.status(404).send({
                    status: 'error',
                    message: 'error en actualizar'
                })}

            return res.status(201).send({
                status: 'success',
                message: 'producto actualizado con exito'
            })

    }

    export const PurchaseCart = async (req,res) => {

        //---------------LOGICA----------------------
            const cid = req.params.cid

            let action = await TicketsService.createTicket(cid)
        //---------------RESPUESTA-------------------
            if(action==false){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay productos para agregar'
                })}

            return res.status(201).redirect('http://localhost:8080/products')

    }