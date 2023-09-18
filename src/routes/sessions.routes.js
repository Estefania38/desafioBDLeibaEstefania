import { Router } from "express";
import passport from "passport";
import { SessionsControllers } from "../controllers/sessions.controllers.js";


const router = Router();

router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), SessionsControllers.redirectLogin);

router.get("/fail-signup", SessionsControllers.failSignup);

router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}), SessionsControllers.redirectProfile);

router.get("/fail-login", SessionsControllers.failLogin);

router.post("/changePass", SessionsControllers.changePassword);

router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"/api/sessions/fail-signup",
}), SessionsControllers.redirectProfile);

router.get("/logout", SessionsControllers.logout);

export { router as sessionsRouter };