export class ProductsMemory{
    constructor(){
        this.products = [];
    };

    getProducts(){
        try {
            return this.products;
        } catch (error) {
            throw new Error("Hubo un error al obtener los productos");
        }
    };


}