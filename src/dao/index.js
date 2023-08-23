import { ProductsMongo } from "./managers/mongo/productsMongo.js";
import { UsersMongo } from "./managers/mongo/users.mongo.js";
import { CartsMongo} from "./managers/mongo/cartMongo.js";
import { config } from "../config/config.js";
import { ProductManager } from "./managers/fileSystem/productsFiles.js";
import { CartManager } from "./managers/fileSystem/cartsFiles.js";
import { connectDB } from "../config/dbConnection.js";


//conectando a la base de datos
connectDB ();//

export const productService = new ProductsMongo();
export const usersService = new UsersMongo();
export const cartService = new CartsMongo();

