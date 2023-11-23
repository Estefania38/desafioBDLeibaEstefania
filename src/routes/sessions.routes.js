import { Router } from "express";
import passport from "passport";
import { SessionsControllers } from "../controllers/sessions.controllers.js";
import {uploaderProfile} from "../utils.js";


const router = Router();

router.post("/signup", uploaderProfile.single("avatar") ,passport.authenticate("signupStrategy",{
   failureRedirect:"/api/sessions/fail-signup"
 }), SessionsControllers.redirectLogin);

 router.get("/fail-signup", SessionsControllers.failSignup);



router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}), SessionsControllers.renderProfile);

router.get("/fail-login", SessionsControllers.failLogin);

router.post("/changePass", SessionsControllers.changePassword);

router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"/api/sessions/fail-signup",
}), SessionsControllers.renderProfile);

router.get("/logout", SessionsControllers.logout);

router.post("/forgot-password", SessionsControllers.forgotPassword);

router.post("/reset-password", SessionsControllers.resetPassword);

export { router as sessionsRouter };