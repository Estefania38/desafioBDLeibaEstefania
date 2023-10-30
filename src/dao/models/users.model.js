import mongoose from "mongoose";
import { usersCollection, productsCollection } from "../../constants/index.js";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    lastname:String,
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    cart: {
        type:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"carts"
        }
    ],       
        default: []
    },
    role: {
        type:String,
        required:true,
        enum: ["user", "admin"],
        default: "user"
    },
    userProd: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: productsCollection
            }
        ],
      
    }
});

export const usersModel = mongoose.model(usersCollection, userSchema);