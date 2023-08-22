import { Router } from "express";
import { cartService, productService } from "../dao/index.js";
import { __dirname } from "../utils.js";


const router = Router();


// ENDPOINT Auxiliar para corroborar todos los carritos 
router.get("/",async(req,res)=>{
  const carrito=await cartService.getCarts()
  res.json({carrito})
})

// Ruta Raiz POST
router.post("/", async (req, res) => {
  try {
    const newCart = await cartService.save();
    res.json({ status: "success", message: "Carrito creado", data: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Ruta GET /:cid
router.get("/:cid", async(req, res) => {
  const cartId = req.params.cid;
  const cart = await cartService.getCartById(cartId);
  if (cart) {
    res.json({ status: "success", data: cart.products });
  } else {
    res.status(404).json({ status: "error", message: "Carrito no encontrado" });
  }
});

// Ruta POST /:cid/product/:pid
router.post("/:cid/product/:pid", async(req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    await cartService.addCart(cartId, productId);
    res.json({ status: "success", message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }

  
   // ENDPOINT que actualiza la lista de productos en el carrito
router.put('/:cid', async (req, res) => {
  try {
      const { cid } = req.params;
      const { products } = req.body;

      // Verificar si todos los productos existen antes de actualizar el carrito
      for (const product of products) {
          const checkId = await productService.getProductById(product._id);

          if (!checkId) {
              return res.status(404).send({ status: 'error', message: `The ID product: ${product._id} not found` });
          }
      }

      // Verificar si el carrito con el ID cid existe
      const checkIdCart = await cm.getCartById(cid);
      if (!checkIdCart) {
          return res.status(404).send({ status: 'error', message: `The ID cart: ${cid} not found` });
      }

      // Actualizar el carrito en la base de datos con la lista de productos actualizada
      const cart = await cartService.updateProductsInCart(cid, products);
      return res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
      console.log(error);
      return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
  }
});

// ENDPOINT para eliminar un producto de un carrito
router.delete('/:cid/product/:pid', async (req, res) => {
  try {
      // Extraer los parámetros de la URL: cid (ID del carrito) y pid (ID del producto)
      const { cid, pid } = req.params;

      // Verificar si el producto con el ID pid existe
      const checkIdProduct = await productService.getProductById(pid);
      if (!checkIdProduct) {
          return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found` });
      }

      // Verificar si el carrito con el ID cid existe
      const checkIdCart = await cartService.getCartById(cid);
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
      const updatedCart = await cartService.deleteProductInCart(cid, checkIdCart.products);

      return res.status(200).send({ status: 'success', message: `Deleted product with ID: ${pid}`, cart: updatedCart });
  } catch (error) {
      console.log(error);
      return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
  }
});


   // ENDPOINT que elimina todos los productos de un carrito
   router.delete('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
  
      if (!cart) {
        return res.status(404).send({ message: `Cart with ID: ${cid} not found` });
      }
  
      if (cart.products.length === 0) {
        return res.status(404).send({ message: 'The cart is already empty' });
      }
  
      // Vaciar el carrito estableciendo la propiedad 'products' como un arreglo vacío.
      cart.products = [];
  
      await cartService.updateOneProduct(cid, cart.products);
  
      return res.status(200).send({
        status: 'success',
        message: `The cart with ID: ${cid} was emptied correctly`,
        cart: cart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'An error occurred while processing the request' });
    }
  })
});


export { router as cartsRouter };
