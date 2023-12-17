import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword, generateToken } from "../utils.js";
import { UsersService } from "../services/users.service.js";
import githubStrategy from "passport-github2";
import { config } from "./config.js";

export const initializePassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            //username, password
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const { first_name } = req.body;
                //verificar si el usuario ya se registro
                const user = await UsersService.getByEmail(username);
                if (user) {
                    return done(null, false)
                } //desde aca es una prueba
                let role = "user";
                if (username.endsWith("@coder.com")) {
                    role = "admin";
                } // aca termina la prueba
                const newUser = {
                    first_name: first_name,
                    email: username,
                    role,
                    password: createHash(password)
                }
                const userCreated = await UsersService.save(newUser);
                return done(null, userCreated)//En este punto passport completa el proceso de manera satisfactoria
            } catch (error) {
                return done(error)
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
                const user = await UsersService.getByEmail(username);
                if (!user) {
                    return done(null, false)
                }
                //si el usuario existe, validar la contraseña
                if (isValidPassword(user, password)) {// agregado para prueba
                    const accessToken = generateToken({ email: user.email, role: user.role });
                    user.token = accessToken; // aca finaliza
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.use("githubLoginStrategy", new githubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackUrl: config.github.callbackUrl,
        },
        async (accesstoken, refreshToken, profile, done) => {
            try {
                const user = await UsersService.getByEmail(profile.username);
                if (!user) {
                    const newUser = {
                        first_name: '',
                        email: profile.username,
                        password: createHash(profile.id)
                    };
                    const userCreated = await UsersService.save(newUser);
                    const accessToken = generateToken({ email: user.email, role: user.role });
                    newUser.token = accessToken;
                    return done(null, userCreated)//En este punto passport completa el proceso de manera
                } else {
                    const accessToken = generateToken({ email: user.email, role: user.role });
                    user.token = accessToken;
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }

    ));

    //serializacion y deserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UsersService.getById(id);
        done(null, user) //req.user --->sesions req.sessions.user
    });
}