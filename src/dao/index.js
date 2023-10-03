import { ProductsMongo } from "./managers/mongo/productsMongo.js";
import { UsersMongo } from "./managers/mongo/users.mongo.js";
import { CartsMongo} from "./managers/mongo/cartMongo.js";
// import { config } from "../config/config.js";
// import { ProductManager } from "./managers/fileSystem/productsFiles.js";
// import { CartManager } from "./managers/fileSystem/cartsFiles.js";
import { connectDB } from "../config/dbConnection.js";
import {TicketsMongo} from "./managers/mongo/ticketsMongo.js"


//conectando a la base de datos
connectDB ();//

export const productDao = new ProductsMongo();
export const usersDao  = new UsersMongo();
export const cartDao = new CartsMongo();
export const ticketsDao = new TicketsMongo();

