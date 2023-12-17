// import { Router } from "express";
// import { __dirname } from "../utils.js";
// import { CartsController } from "../controllers/carts.controllers.js";
// import {TicketsController} from "../controllers/tickets.controllers.js";


// const router = Router();

// // ENDPOINT Auxiliar para corroborar todos los carritos 
// router.get("/", CartsController.getCarts);
// router.post("/", CartsController.createCart);
// router.get("/:cid", CartsController.getCartById);
// router.post("/:cid/product/:pid", CartsController.addProductToCart);
// // ENDPOINT que actualiza la lista de productos en el carrito
// router.put('/:cid', CartsController.updateListCart);
// // ENDPOINT para eliminar un producto de un carrito
// router.delete('/:cid/product/:pid', CartsController.deleteProductInCart);
// // ENDPOINT que elimina todos los productos de un carrito
// router.delete('/:cid', CartsController.deleteCart);
// //para resolver la orden del carrito
// router.put("/:cid", CartsController.resolveOrderCart);

// //ruta para el ticket
// router.post("/:cid/purchase", TicketsController.createTicket );


// export { router as cartsRouter };

import { Router } from "express";
import { PurchaseCart, UpdateAllCart, UpdateProductQty, addToCartByID, createCart, deleteAllProducts, deleteProductInCart, getCartByID } from "../controllers/carts.controllers.js";

import { __dirname } from "../utils.js";
// import { UserPass } from "../utils.js";

const router = Router()

router.post('/', createCart)

router.get('/:cid', getCartByID)

router.post('/:cid/product/:pid', addToCartByID)//UserPass('current'),

router.delete('/:cid/products/:pid', deleteProductInCart )

router.delete('/:cid', deleteAllProducts)

router.put('/:cid', UpdateAllCart)

router.put('/:cid/products/:pid', UpdateProductQty)

router.post('/:cid/purchase', PurchaseCart)


export { router as cartsRouter };