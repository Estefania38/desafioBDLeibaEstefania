// import { Router } from "express";
// import passport from "passport";
// import { SessionsControllers } from "../controllers/sessions.controllers.js";


// const router = Router();

// router.post("/signup", passport.authenticate("signupStrategy",
//  {
//     failureRedirect: "/api/sessions/fail-signup"
// }), SessionsControllers.redirectLogin);

// router.get("/fail-signup", SessionsControllers.failSignup);

// router.post("/login", passport.authenticate("loginStrategy",{
//     failureRedirect:"/api/sessions/fail-login"
// }), SessionsControllers.renderProfile);

// router.get("/fail-login", SessionsControllers.failLogin);

// router.post("/changePass", SessionsControllers.changePassword);

// router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

// router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
//     failureRedirect:"/api/sessions/fail-signup",
// }), SessionsControllers.renderProfile);

// router.get("/logout", SessionsControllers.logout);

// router.post("/reset-password", SessionsControllers.resetPassword);

// export { router as sessionsRouter };

import { Router } from "express";
import { UsersService } from "../services/users.service.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import { SessionsControllers } from "../controllers/sessions.controllers.js";

const router = Router();

router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
 }), SessionsControllers.redirectLogin);

//  (req,res)=>{
//      res.render("login",{message:"usuario registrado"});

//  router.get("/fail-signup", (req,res)=>{
//      res.render("signup",{error:"No se pudo registrar el usuario"});
//  });

router.get("/fail-signup", SessionsControllers.failSignup);

router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"/api/sessions/fail-signup",
}), SessionsControllers.renderProfile);


router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}), SessionsControllers.renderProfile);

// (req,res)=>{
//     res.redirect("/perfil");
// });


 router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));



router.get("/fail-login", (req,res)=>{
    res.render("login",{error:"Credenciales invalidas"});
});

router.post("/forgot-password", SessionsControllers.forgotPassword);

router.post("/changePass", async(req,res)=>{
    try {
        const form = req.body;
        const user = await UsersService.getByEmail(form.email);
        if(!user){
            return res.render("changePassword",{error:"No es posible cambiar la contraseña"});
        }
        user.password = createHash(form.newPassword);
        // console.log(user);
        await UsersService.updateUser(user._id,user);
        return res.render("login",{message:"Contraseña restaurada"})
    } catch (error) {
        res.render("changePassword",{error:error.message});
    }
});

router.get("/logout", (req,res)=>{
    req.logOut(error=>{
        if(error){
            return res.render("profile",{user: req.user, error:"No se pudo cerrar la sesion"});
        } else {
            //req.session.destroy elimina la sesion de la base de datos
            req.session.destroy(error=>{
                if(error) return res.render("profile",{user: req.session.userInfo, error:"No se pudo cerrar la sesion"});
                res.redirect("/");
            })
        }
    })
});

export {router as sessionsRouter};