import { Router } from "express";//
import { __dirname } from "../utils.js";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";
import { ViewsController } from "../controllers/views.controllers.js";

const router = Router();

        //routes de las vistas
        router.get("/", ViewsController.renderHome);
        router.get("/registro",showLoginView, ViewsController.renderSignup);
        router.get("/login", showLoginView, ViewsController.renderLogin);
        router.get("/perfil", checkUserAuthenticated, ViewsController.renderProfile);
        router.get("/cambiar-password", ViewsController.renderChangePassword);
        // corregir la vita del chat       
        router.get("/chat", ViewsController.renderChat);
        router.get("/productos",ViewsController.renderProducts);
       
        //ruta a productos en tiempo real  que no estoy usando
        router.get('/realtimeproducts', ViewsController.renderRealTimeProducts);   
      
export {router as viewsRouter};









