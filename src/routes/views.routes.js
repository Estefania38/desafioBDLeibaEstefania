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
         router.get("/forgot-password", ViewsController.renderForgotPassword);
         router.get("/reset-password", ViewsController.renderResetPassword);
        // corregir la vita del chat       
        router.get("/chat", checkAuthenticated, checkRole(["user", "admin"]), ViewsController.renderChat);
        router.get("/productos", checkAuthenticated, checkRole(["admin"]), ViewsController.renderProducts);
       
         //ruta a productos en tiempo real  que no estoy usando
         router.get('/realtimeproducts', ViewsController.renderRealTimeProducts);   
         router.get('/carts/:cid', ViewsController.renderCart)
         router.get('/createproduct',checkRole(["admin"]), ViewsController.renderCreateProduct)
         router.get('/deleteproduct',checkRole(["admin"]), ViewsController.renderDeleteProduct)
 export {router as viewsRouter};


// import { Router } from "express";
// import { checkAuthenticated, showLoginView, checkRole } from "../middlewares/auth.js";
// import { ViewsController } from "../controllers/views.controllers.js";

// const router = Router();

// router.get("/",(req,res)=>{
//     res.render("home");
//  });

// router.get("/registro",showLoginView,(req,res)=>{
//   res.render("signup");
//  });

// router.get("/login", showLoginView, (req,res)=>{
//     res.render("login");
// });

// router.get("/perfil", checkAuthenticated, (req,res)=>{
//     console.log(req.user);
//     res.render("profile",{user: req.user});
// });



//   //routes de las vistas
//   // router.get("/", ViewsController.renderHome);
//   // router.get("/registro",showLoginView, ViewsController.renderSignup);

 
//   router.get("/forgot-password", ViewsController.renderForgotPassword);
//   router.get("/reset-password", ViewsController.renderResetPassword);
//   // corregir la vita del chat       
//   router.get("/chat", checkAuthenticated, checkRole(["user", "admin"]), ViewsController.renderChat);
//   router.get("/productos", checkAuthenticated, checkRole(["admin"]), ViewsController.renderProducts);
 
//   //ruta a productos en tiempo real  que no estoy usando
//   router.get('/realtimeproducts', ViewsController.renderRealTimeProducts);   

// export {router as viewsRouter};






