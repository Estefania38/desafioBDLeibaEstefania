import mongoose from "mongoose";
import { usersCollection, productsCollection } from "../../constants/index.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    cart: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            }
        ],
        default: []
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "premium"],
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