import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    // aca definimos las propiedades y caracteristicas para el documento de un schema
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["electro","linea blanca","accesorios"]
    },
    stock:{
        type:Number,
        required:true
    }
});

// aplicando paginacion al Schema
productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productSchema);

const Product = mongoose.model("Products", productSchema);

export default Product;
