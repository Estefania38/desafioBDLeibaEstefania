import { Router } from "express";
import { __dirname } from "../utils.js";
import { ProductsController } from "../controllers/products.controllers.js"; 
import {checkRole, checkAuthenticated} from "../middlewares/auth.js"
import {uploaderProduct} from "../utils.js"


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
router.get("/", ProductsController.getProducts);

// Ruta GET /:pid corregido ok
router.get("/:pid", ProductsController.getProductById);

// Ruta POST / corregido ok
router.post("/", checkAuthenticated, checkRole(["admin", "superadmin", "premium"]), uploaderProduct.single("thumbnail"), validateFields, ProductsController.createdProduct);

// Ruta PUT /:pid corregido ok
router.put("/:pid", checkAuthenticated, checkRole(["admin"]),validateFields, ProductsController.updateProduct);

// Ruta DELETE /:pid
router.delete("/:pid", checkAuthenticated, checkRole(["admin", "premium"]), ProductsController.deleteProduct);

export { router as productsRouter };
