import { ProductsService } from "../services/products.service.js";

export class ProductsController{

    static getProducts = async (req, res) => {
        try {
          const limit = parseInt(req.query.limit);
          const products = await ProductsService.getProducts();
          if (!isNaN(limit) && limit > 0) {
            const limitedProducts = products.slice(0, limit);
            return res.json({ status: "success", data: limitedProducts });
          } else {
            return res.json({ status: "success", data: products });
          }
        } catch (error) {
          return res.status(500).send(error.message);
        }
    }
    static getProductById =  async (req, res) => {
        try {
          const productId =(req.params.pid);
          const product = await ProductsService.getProductById(productId);
          if (product) {
            return res.json({ status: "success", data: product });
          } else {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
          }
        } catch (error) {
          return res.status(500).send(error.message);
        }
    }
    static createdProduct = async (req, res) => {
        try {
          const productInfo = req.body;
          const productCreated = await ProductsService.saveProduct(productInfo);
          return res.json({ status: "success", message: "Producto creado", data:productCreated });
        } catch (error) {
          return res.status(500).send(error.message);
        }
    }
    static updateProduct = async (req, res) => {
        try {
          const productId = req.params.pid;
          const updatedFields = req.body;
          const productUpdated = await ProductsService.updateProduct(productId, updatedFields);
          if (productUpdated) {
            return res.json({ status: "success", message: "Producto actualizado", data: productUpdated });
          } else {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
          }
        } catch (error) {
          return res.status(500).send(error.message);
        }
    }
    static deleteProduct =  async (req, res) => {
        try {
          const productId = req.params.pid;
          const result = await ProductsService.deleteProduct(productId);
          if (result) {
            console.log('hola eliminado');
            return res.status(200).json({ status: "success", message: "Producto eliminado" });
          } else {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
          }
        } catch (error) {
          return res.status(500).send(error.message);
        }
    }
      

}