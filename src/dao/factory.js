import { config } from "../config/config.js";
// import { ProductManager } from "./managers/fileSystem/productsFiles.js";
// import { CartManager } from "./managers/fileSystem/cartsFiles.js";

const persistence = config.server.persistence; // mongo, memory, sql, filesystem

let contactsDao;
let productDao;
let cartDao;
let usersDao;
let ticketsDao;
let businessDao;

switch (persistence) {
    case "mongo":
        //importar la conexion a la base de datos de mongo
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        //importar los managers
        const {ContactsMongo} = await import("./managers/mongo/contactsMongo.js");
        const {ProductsMongo } = await import("./managers/mongo/productsMongo.js");
        const {UsersMongo } = await import("./managers/mongo/users.mongo.js");
        const {CartsMongo } = await import("./managers/mongo/cartMongo.js");
        const {TicketsMongo } = await import("./managers/mongo/ticketsMongo.js");
        const {BusinessMongo } = await import ("./managers/mongo/businessMongo.js");
        contactsDao = new ContactsMongo();
        productDao = new ProductsMongo();
        usersDao  = new UsersMongo();
        cartDao = new CartsMongo();
        ticketsDao = new TicketsMongo();
        businessDao = new BusinessMongo();
        break;

     case "memory":
         const {ContactsMemory} = await import("./memory/contacts.memory.js");
         const {ProductsMemory} = await import("./memory/products.memory.js");
         contactsDao = new ContactsMemory();
         productDao = new ProductsMemory();
         break;

         // terminar de definir las rutas de memory para los diferentes DAo

    default:
        break;
}

export {contactsDao, productDao, cartDao, usersDao, ticketsDao, businessDao};