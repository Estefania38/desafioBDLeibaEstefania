import { Router } from "express";
import { UsersControllers } from "../controllers/users.controllers.js";



const router = Router ();

router.get("/", UsersControllers.getUsers );
router.get("/:uid", UsersControllers.getUsersById );
router.post("/", UsersControllers.createUser );
// actualizar usuario
router.put("/:uid/:pid", UsersControllers.updateUser);

export { router as usersRouter};