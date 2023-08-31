import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { usersService } from "../dao/index.js";


export const initializePassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField: "email", // con este parametro le indico que tome como user name el campo "email"
            passReqToCallbacks: true,
        },
        async (req, username, password, done) => {
            try {
                const { first_name } = req.body;
                const user = await usersService.getByEmail(username);
                if (user) {
                    return done(null, false);
                }
                const newUser = {
                    first_name: first_name,
                    last_name: last_name,
                    email: username,
                    age: age,
                    password: createHash(password)
                }
                const userCreated = await usersService.createUser(newUser);
                return done(null, userCreated)
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email"
        },
        async (username, password, done) => {
            try {
                //verificar si el usuario ya se registro
                const user = await usersService.getByEmail(username);
                if (!user) {
                    return done(null, false)
                }
                //si el usuario existe, validar la contraseña
                if (isValidPassword(user, password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
    // serializacion y deserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser(async (id, done) => {
        const user = await usersService.getUserById(id);
        done(null, user)
    });
}