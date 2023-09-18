import mongoose from "mongoose";
import { usersCollection, productsCollection } from "../../constants/index.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type: 'string',
    },
    last_name: {
        type: 'string',
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: "string",
        required: true,
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