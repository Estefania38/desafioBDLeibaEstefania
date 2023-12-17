import mongoose from "mongoose";
import { chatCollection } from "../../constants/index.js";

const messageSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true,
        default:[]
    }
});

export const chatModel = mongoose.model(chatCollection, messageSchema)



