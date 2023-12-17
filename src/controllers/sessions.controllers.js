import { createHash, validateToken } from "../utils.js";
import {generateEmailToken, recoveryEmail} from "../helpers/gmail.js"
import { UsersService } from "../services/users.service.js";

export class SessionsControllers {

    static redirectLogin =  (req, res) => {
        res.render("login", { message:"usuario registrado con exito"})
    }
    static failSignup = (req, res) => {           
        res.render("signup", { error: "Error al registrar el usuario" });
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
            const user = await UsersService.getByEmail(form.email);
            if (!user) {
                return res.render("changePassword", { error: "No es posible cambiar la contraseña" });
            }
            user.password = createHash(form.newPassword);
            await UsersService.updateUser(user._id, user);
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
    static forgotPassword = async (req, res)=>{
        try {
            const {email} = req.body;
            const user = await UsersService.getByEmail(email);
            if(!user){
                return res.json({status:"error", message:"No es posible restablecer la constraseña"});
            }
            //generamos el token con el link para este usuario
            const token = generateEmailToken(email,5*60); //token de 5 min.
            //Enviar el mensaje al usuario con el enlace
            await recoveryEmail(req,email,token);
            res.send("Correo enviado, volver al home  <a href='/'>Volver al Home</a>");
        } catch (error) {
            res.json({status:"error", message:"No es posible restablecer la constraseña"});
        }
    };  
    static resetPassword = async(req,res)=>{
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            const validEmail = validateToken(token);
            if(validEmail){//token correcto
                const user = await UsersService.getByEmail(validEmail);
                if(user){
                    user.password = createHash(newPassword);
                    await UsersService.updateUser(user._id,user);
                    res.send("Contraseña actualizada <a href='/login'>Ir al login</a>")
                }
            } else {
                return res.send("El token ya caduco, volver a intentarlo <a href='/forgot-password'>Restablecer contraseña</a>");
            }
        } catch (error) {
            res.send("No se pudo restablecer la contraseña, volver a intentarlo <a href='/forgot-password'>Restablecer contraseña</a>");
        }
    };
    
}