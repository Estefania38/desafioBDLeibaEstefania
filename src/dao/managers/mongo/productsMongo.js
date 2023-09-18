import { productsModel } from "../../models/products.model.js";

export class ProductsMongo {
    constructor() {
        this.model = productsModel;
    };

    //save product es para crear el producto
    async saveProduct(product) {
        try {
            const productCreated = await this.model.create(product)
            return productCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al crear el producto");
        }
    };

    // getProducts
    async getProducts() {
        try {
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los productos");
        }
    };


    //getProductById  obtengo el producto por rl Id
    async getProductById(productId) {
        try {
            const product = await this.model.findById(productId);
            if (!product) {
                throw new Error("El producto no existe")
            }
            return product;
        } catch (error) {
            console.log(error.message);
            throw new Error("Producto no encontrado");
        }
    };

    // updateProduct actualizo el producto
    async updateProduct(productId, updatedFields) {
        try {
            const productUpdated = await this.model.findByIdAndUpdate(productId, updatedFields, { new: true }); // Devolverá el documento modificado después de la actualización
            if (productUpdated) {
                console.log("Producto actualizado con éxito. El producto actualizado es:", productUpdated);
                return productUpdated;
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al actualizar el producto");
        }
    };

    // deleteProduct 
    async deleteProduct(productId) {
        try {
            const product = await this.getProductById(productId);
            if (product) {
                await this.model.findByIdAndRemove(productId);
                console.log("Producto eliminado con éxito");
                return "Producto eliminado";
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al eliminar el producto");
        }
    };

     async getWithPaginate(query, options){
         try {
             const products = await productsModel.paginate(query, options);
             return products;
         } catch (error) {
             throw error;
         }
     }
}









