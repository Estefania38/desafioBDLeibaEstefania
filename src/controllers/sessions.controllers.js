import { createHash } from "../utils.js";
import { UsersControllers } from "./users.controllers.js";

export class SessionsControllers {

    static redirectLogin =  (req, res) => {
        res.redirect("/login", { message: "usuario registrado con exito" })
    }
    static failSignup = (req, res) => {   
        res.send("<p>No se pudo registrar al usuario, <a href='/registro'>intenta de nuevo</a></p>");
        // res.render("signup", { error: "Error al registrar el usuario" });
    }
    static renderProfile = (req,res)=>{
        const user = req.user;
        console.log("user", user);
        res.render("profile",{user});
        // res.redirect("/perfil");
    }
    static failLogin =  (req,res)=>{
        res.send("<p>No se pudo loguear al usuario, <a href='/login'>intenta de nuevo</a></p>");
        // res.render("login",{error:"Credenciales invalidas"});
    }
    static changePassword = async (req, res) => {
        try {
            const form = req.body;
            const user = await UsersControllers.getUserByEmail(form.email);
            if (!user) {
                return res.render("changePassword", { error: "No es posible cambiar la contraseña" });
            }
            user.password = createHash(form.newPassword);
            await UsersControllers.updateUser(user._id, user);
            return res.render("login", { message: "Contraseña restaurada" });
        } catch (error) {
            res.render("changePassword", { error: error.message });
        }
    }
    static logout = (req, res) => {
        req.logOut(error => {
            if (error) {
                return res.render("profile", { user: req.user, error: "No se pudo cerrar la sesion" });
            } else {
                req.session.destroy(error => {
                    if (error) return res.render("profile", { user: req.session.userInfo, error: "No se pudo cerrar la sesion" });
                    res.redirect("/");
                })
            }
        })
    }

}