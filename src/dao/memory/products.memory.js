export class ProductsMemory{
    constructor(){
        this.products = [];
    };

    get(){
        try {
            return this.products;
        } catch (error) {
            throw error;
        }
    };
}