import mongoose from "mongoose";
import { usersCollection, productsCollection} from "../../constants/index.js";


const userSchema = new mongoose.Schema({

    first_name:{
        type: 'string',
    },
    last_name:{
        type: 'string',
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    age:{
        type: 'number',
    },
    password:{
        type: 'string',
        required: true
    },
    userProd:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: productsCollection
            }
        ],
        default:[]
    }
})

export const usersModel = mongoose.model(usersCollection, userSchema);