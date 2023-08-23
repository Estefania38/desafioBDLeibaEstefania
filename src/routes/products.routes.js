import { Router } from "express";
import { __dirname } from "../utils.js";
import { productService } from "../dao/index.js";



const productCodes = new Set();
const validateFields = (req, res, next) => {
  const productInfo = req.body;  
  if (!productInfo.title || !productInfo.price || !productInfo.description || !productInfo.code || !productInfo.category) {
    return res.json({ status: "error", message: "Campos incompletos" });
  }   
  // Verifico si el código del producto ya existe en el registro
  if (productCodes.has(productInfo.code)) {
    return res.json({ status: "error", message: "El código del producto ya existe" });
  }
  // Si no existe, agrego el código al registro
  productCodes.add(productInfo.code);
  next();
};


const router = Router();

// Ruta raíz GET /
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productService.getProducts();
    if (!isNaN(limit) && limit > 0) {
      const limitedProducts = products.slice(0, limit);
      return res.json({ status: "success", data: limitedProducts });
    } else {
      return res.json({ status: "success", data: products });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta GET /:pid corregido ok
router.get("/:pid", async (req, res) => {
  try {
    const productId =(req.params.pid);
    const product = await productService.getProductById(productId);
    if (product) {
      return res.json({ status: "success", data: product });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta POST / corregido ok
router.post("/",validateFields, async (req, res) => {
  try {
    const productInfo = req.body;
    const productCreated = await productService.saveProduct(productInfo);
    return res.json({ status: "success", message: "Producto creado", data:productCreated });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta PUT /:pid corregido ok
router.put("/:pid",validateFields, async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedFields = req.body;
    const productUpdated = await productService.updateProduct(productId, updatedFields);
    if (productUpdated) {
      return res.json({ status: "success", message: "Producto actualizado", data: productUpdated });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Ruta DELETE /:pid
router.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const result = await productService.deleteProduct(productId);
    if (result) {
      console.log('hola eliminado');
      return res.status(200).json({ status: "success", message: "Producto eliminado" });
    } else {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export { router as productsRouter };
