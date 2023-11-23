import mongoose from "mongoose";
import { usersCollection, productsCollection } from "../../constants/index.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
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
    documents: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                reference: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
    },
    last_connection: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enums: ["pendiente", "incompleto", "completo"],
        default: "pendiente"
    },
    avatar: {
        type: String,
        required: true
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