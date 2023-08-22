import { ProductsMongo } from "./managers/mongo/productsMongo.js";
import { UsersMongo } from "./managers/mongo/users.mongo.js";



export const productService = new ProductsMongo();
export const usersService = new UsersMongo();