import mongoose from "mongoose";
import { businessColecction } from "../../constants/index.js";



const businessSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    products:{
        type:[],
        default:[]
    }
});

export const businessModel = mongoose.model(businessColecction,businessSchema);