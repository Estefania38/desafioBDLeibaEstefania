import { ProductsMongo } from "./managers/mongo/productsMongo.js";
import { UsersMongo } from "./managers/mongo/users.mongo.js";
import { CartsMongo} from "./managers/mongo/cartMongo.js";
import { config } from "../config/config.js";



export const productService = new ProductsMongo();
export const usersService = new UsersMongo();
export const cartService = new CartsMongo();