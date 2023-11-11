import {config } from "../config/config.js";
import {mongoose } from "mongoose";
import { productsModel } from "../dao/models/products.model.js";


// aca le asigno a los productos que ya tenia en la base de datos el creador con rol de admin
const updateProducts = async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("base de datos conectada");
        const adminId= "64e2e1036da0af42035d4e83";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally{
        await mongoose.connection.close();
    }
};

updateProducts();