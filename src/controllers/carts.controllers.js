import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";

export class CartsController {

    static getCarts = async (req, res) => {
        const carrito = await CartsService.getCarts()
        res.json({ carrito })
    }
    static saveCarts = async (req, res) => {
        try {
            const newCart = await CartsService.save();
            res.json({ status: "success", message: "Carrito creado", data: newCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    static getCartById = async (req, res) => {
        const cid = req.params.cid;
        const cart = await CartsService.getCartById(cid);
        if (cart) {
            res.json({ status: "success", data: cart.products });
        } else {
            res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }
    }
    static addProductToCart = async (req, res) => {
        const cid = req.params.cid;
        const productId = req.params.pid;
        try {
            await CartsService.addCart(cid, productId);
            res.json({ status: "success", message: "Producto agregado al carrito" });
        } catch (error) {
            res.status(404).json({ status: "error", message: error.message });
        }
    }
    // ENDPOINT que actualiza la lista de productos en el carrito  
    static updateListCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            // Verificar si todos los productos existen antes de actualizar el carrito
            for (const product of products) {
                const checkId = await ProductsService.getProductById(product._id);
                if (!checkId) {
                    return res.status(404).send({ status: 'error', message: `The ID product: ${product._id} not found` });
                }
            }
            // Verificar si el carrito con el ID cid existe
            const checkIdCart = await CartsService.getCartById(cid);
            if (!checkIdCart) {
                return res.status(404).send({ status: 'error', message: `The ID cart: ${cid} not found` });
            }
            // Actualizar el carrito en la base de datos con la lista de productos actualizada
            const cart = await CartsService.updateProductsInCart(cid, products);
            return res.status(200).send({ status: 'success', payload: cart });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
        }
    }
    static deleteProductInCart = async (req, res) => {
        try {
            // Extraer los parámetros de la URL: cid (ID del carrito) y pid (ID del producto)
            const { cid, pid } = req.params;
            // Verificar si el producto con el ID pid existe
            const checkIdProduct = await ProductsService.getProductById(pid);
            if (!checkIdProduct) {
                return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found` });
            }
            // Verificar si el carrito con el ID cid existe
            const checkIdCart = await CartsService.getCartById(cid);
            if (!checkIdCart) {
                return res.status(404).send({ status: 'error', message: `Cart with ID: ${cid} not found` });
            }
            // Buscar el índice del producto en la lista de productos del carrito
            const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
            if (findProductIndex === -1) {
                return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
            }
            // Eliminar el producto de la lista de productos del carrito
            checkIdCart.products.splice(findProductIndex, 1);
            // Actualizar el carrito en la base de datos sin el producto eliminado
            // revisar el llamado si esta correcto en CartService
            const updatedCart = await CartsService.deleteProductInCart(cid, checkIdCart.products);
            return res.status(200).send({ status: 'success', message: `Eliminar producto con  ID: ${pid}`, cart: updatedCart });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: 'error', message: 'Ocurrio un error en ek proceso de request' });
        }
    }
    static deleteCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await CartsService.getCartById(cid);
            if (!cart) {
                return res.status(404).send({ message: `Carrito con ID: ${cid} no encontrado` });
            }
            if (cart.products.length === 0) {
                return res.status(404).send({ message: 'El carrito esta vacio' });
            }
            // Vaciar el carrito estableciendo la propiedad 'products' como un arreglo vacío.
            cart.products = [];
            await CartsService.updateOneProduct(cid, cart.products);
            return res.status(200).send({
                status: 'success',
                message: `El carro con ID: ${cid} fue borrado correctamente`,
                cart: cart,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Ocurrio un error en el proceso de request' });
        }
    }
}