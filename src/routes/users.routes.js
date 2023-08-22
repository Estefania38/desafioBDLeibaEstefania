import { Router } from "express";
import { usersService } from "../dao/index.js";


const router = Router ();

router.get("/", async (req, res) => {
    try{
        const users = await usersModel.find();
        res.json({status:"success", data:users});

    }catch(error){
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al obtener los usuarios"})
    }
});

router.get("/:uid", async (req, res) => {
    try{
        const userId= req.params.uid;
        const user = await usersService.getUserById(userId);
        res.json({status:"success", data:user});

    }catch(error){
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al obtener los usuarios"})
    }
});

router.post("/", async (req, res) => {
    try{
        const userInfo= req.body;
        const userCreated = await usersService.createUser(userInfo);
        res.json({status:"success", data:userCreated, message:"usuario creado con exito"});
    }catch(error){
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al obtener los usuarios"})
    }
});

// actualizar usuario
router.put("/:uid/:pid", async (req, res) => {
    try{
        const {uid,pid} = req.params;
        const user= await usersService.getUserById(uid);
        user.userProd.push(pid);

        const result = await usersService.updateUser(uid,user);
        res.json({status:"success", data:result, message:"usuario actualizado con exito"});
    }catch(error){
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al actualizar los usuarios"})
    }
});

export { router as usersRouter};