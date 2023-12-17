import { Router } from "express";
import {checkRole} from "../middlewares/auth.js";
import { UsersControllers } from "../controllers/users.controllers.js";



const router = Router ();

router.get("/", UsersControllers.getUsers);
router.get("/:uid", UsersControllers.getById );
router.post("/", UsersControllers.save );
router.put("/:uid/:pid", UsersControllers.updateUser);
router.post("/premium/:uid", checkRole(["admin"]) ,UsersControllers.modifyRole);

export { router as usersRouter};