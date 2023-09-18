import { usersDao  } from "../dao/index.js";
import { usersModel
 } from "../dao/models/users.model.js";

export class UsersControllers {
    static  getUsers = async (req, res) => {
        try{
            const users = await usersModel.find();
            res.json({status:"success", data:users});
    
        }catch(error){
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al obtener los usuarios"})
        }
    }
    static getUsersById = async (req, res) => {
        try{
            const userId= req.params.uid;
            const user = await usersDao.getUserById(userId);
            res.json({status:"success", data:user});
    
        }catch(error){
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al obtener los usuarios"})
        }
    }
    static createUser = async (req, res) => {
        try{
            const userInfo= req.body;
            const userCreated = await usersDao.createUser(userInfo);
            res.json({status:"success", data:userCreated, message:"usuario creado con exito"});
        }catch(error){
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al obtener los usuarios"})
        }
    }
    static updateUser = async (req, res) => {
        try{
            const {uid,pid} = req.params;
            const user= await usersDao.getUserById(uid);
            user.userProd.push(pid);
    
            const result = await usersDao.updateUser(uid,user);
            res.json({status:"success", data:result, message:"usuario actualizado con exito"});
        }catch(error){
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al actualizar los usuarios"})
        }
    }
}