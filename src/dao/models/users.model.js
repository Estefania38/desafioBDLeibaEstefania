import mongoose from "mongoose";
import { usersCollection, productsCollection } from "../../constants/index.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required:true,
    },
    last_name:String,
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
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
        default: []
    }
})

export const usersModel = mongoose.model(usersCollection, userSchema);