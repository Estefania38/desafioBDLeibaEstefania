import { UsersService } from "../services/users.service.js";

export class UsersControllers {

    static getUsers = async (req, res) => {
        try {
            const users = await UsersService.getUsers();
            res.json({ status: "success", data: users });

        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al obtener los usuarios" })
        }
    }
    static getById = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getById(userId);
            res.json({ status: "success", data: user });
        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al obtener los usuarios" })
        }
    }
    static save = async (req, res) => {
        try {
            const newUser = req.body;
            if (!first_name || !last_name || !email) {
                //datos no validos, generar el error
                CustomError.createError({
                    name: "error createUser",
                    cause: createUserErrorMsg(req.body),
                    message: "Datos invalidos para crear el usuario",
                    errorCode: EError.INVALID_JSON
                });
            }
            const userCreated = await UsersService.save(newUser);
            res.json({ status: "success", data: userCreated, message: "usuario creado con exito" });
        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al crear el usuarios" })
        }
    }
    static updateUser = async (req, res) => {
        try {
            const { uid, pid } = req.params;
            const user = await UsersService.getById(uid);
            user.userProd.push(pid);
            const result = await UsersService.update(uid, user);
            res.json({ status: "success", data: result, message: "usuario actualizado con exito" });
        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al actualizar los usuarios" })
        }
    }
    static getByEmail = async (req, res) => {
        try {
            const user = await UsersService.getByEmail({ email: userEmail });
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            res.json({ status: "error", message: "hubo un error al obtener el email" })
        }
    }
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            //verificar si el usuario en la db
            const user = await UsersService.getById(userId);
            const userRole = user.role;
            //validacion del role actual y cambio
            if(userRole === "user"){
                user.role = "premium";
            } else if(userRole === "premium"){
                user.role = "user";
            } else {
                return res.json({status:"error", message:"No se puede cambiar el role de este usuario"});
            };
            await UsersService.update(user._id,user);
            return res.json({status:"success", message:`El nuevo rol del usuario es ${user.role}`});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
}