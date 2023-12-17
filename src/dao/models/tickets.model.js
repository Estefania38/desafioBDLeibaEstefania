import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: String,
    amount: Number,
    purchaser: String
    },
    {timestamps:true}
)

mongoose.set('strictQuery',false)

export const ticketsModel = mongoose.model(ticketsCollection,ticketSchema);


