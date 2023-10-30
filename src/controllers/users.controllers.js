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
    static getUserById = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            res.json({ status: "success", data: user });
        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al obtener los usuarios" })
        }
    }
    static createUser = async (req, res) => {
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
            const userCreated = await UsersService.createUser(newUser);
            res.json({ status: "success", data: userCreated, message: "usuario creado con exito" });
        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al crear el usuarios" })
        }
    }
    static updateUser = async (req, res) => {
        try {
            const { uid, pid } = req.params;
            const user = await UsersService.getUserById(uid);
            user.userProd.push(pid);

            const result = await UsersService.updateUser(uid, user);
            res.json({ status: "success", data: result, message: "usuario actualizado con exito" });
        } catch (error) {
            console.log(error.message);
            res.json({ status: "error", message: "hubo un error al actualizar los usuarios" })
        }
    }
    static getUserByEmail = async (req, res) => {
        try {
            const user = await UsersService.getUserByEmail({ email: userEmail });
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            res.json({ status: "error", message: "hubo un error al obtener el email" })
        }
    }
}