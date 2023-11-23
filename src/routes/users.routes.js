import { Router } from "express";
import {checkRole} from "../middlewares/auth.js";
import { UsersControllers } from "../controllers/users.controllers.js";
import {uploaderDocuments} from "../utils.js"


const router = Router ();

router.get("/", UsersControllers.getUsers);
router.get("/:uid", UsersControllers.getById);
router.post("/", UsersControllers.save);
// actualizar usuario
router.put("/:uid/:pid", UsersControllers.updateUser);
router.post("/premium/:uid", checkRole(["admin"]) ,UsersControllers.modifyRole);
// router para documentacion
router.put("/:uid/documents", uploaderDocuments.array([
    {name:"identificacion", maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"estadoDeCuenta", maxCount:1},
]), UsersControllers.uploadDocuments)


export { router as usersRouter};


