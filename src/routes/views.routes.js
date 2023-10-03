import { Router } from "express";//
import { __dirname } from "../utils.js";
import { checkAuthenticated, showLoginView, checkRole} from "../middlewares/auth.js";
import { ViewsController } from "../controllers/views.controllers.js";

const router = Router();

        //routes de las vistas
        router.get("/", ViewsController.renderHome);
        router.get("/registro",showLoginView, ViewsController.renderSignup);
        router.get("/login", showLoginView, ViewsController.renderLogin);
        router.get("/perfil", checkAuthenticated, ViewsController.renderProfile);
        router.get("/cambiar-password", ViewsController.renderChangePassword);
        // corregir la vita del chat       
        router.get("/chat",  checkAuthenticated, checkRole(["user"]), ViewsController.renderChat);
        router.get("/productos", checkAuthenticated, checkRole(["admin"]), ViewsController.renderProducts);
       
        //ruta a productos en tiempo real  que no estoy usando
        router.get('/realtimeproducts', ViewsController.renderRealTimeProducts);   
      
export {router as viewsRouter};









