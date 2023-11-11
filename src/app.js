import express from "express";//
import {config} from "./config/config.js";//
// import {transporter, adminEmail} from "./config/gmail.config.js"
import { __dirname } from "./utils.js";//
import path from "path";//
import {engine} from "express-handlebars";//
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { swaggerSpecs } from "./config/swagger.config.js";
import swaggerUI from "swagger-ui-express";
import passport from "passport";
import { initializePassport } from "./config/passportConfig.js";
import compression from "express-compression";
// importando mis rutas
import { viewsRouter } from "./routes/views.routes.js";//
import { productsRouter } from "./routes/products.routes.js";//
import { usersRouter } from "./routes/users.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { contactsRouter} from "./routes/contacts.routes.js";
import { businessRouter } from "./routes/business.routes.js";
// import cors from "cors";
import {addLogger } from "./helpers/logger.js"



//inicializando el servidor
const app = express();//
const logger = addLogger();
const port = config.server.port;//


//guardar el servidor http en una variable
app.listen(port,()=>logger.info(`server listening on port ${port}`));//

//conectar session con filestorage
const fileStorage = FileStore(session);

//configuracion de las sessiones en el servidor
app.use(session({
    store: new MongoStore({
        ttl:60,
        retries:0,
        mongoUrl: config.mongo.url,
    }),
    secret: config.server.secretSession, //cifra el id de la sesion dentro de la cookie
    resave:true,
    saveUninitialized:true
}));

// configuracion de passport (siempre se configura despues de la configuracion de sessiones)
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


//midleware para que express entienda lo que envio por body  
app.use(express.json()); //
app.use(express.urlencoded({extended:true}));//
// archivos staticos
app.use(express.static(path.join(__dirname+"/public")));//

//configuracion para utilizar handlebars - motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));//
app.set('view engine', '.hbs');//
app.set('views', path.join(__dirname+"/views"));//

// mis rutas a las vistas
app.use(viewsRouter);//
app.use("/api/products",  productsRouter); //compression({brotli:{enabled:true, zlip:{}}})//, productsRouter);
app.use("/api/users", usersRouter);//
app.use("/api/sessions", sessionsRouter);
app.use("/api/cart", cartsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/business", businessRouter);
// endpoint para acceder a la documentacion de la api
app.use ("/api/docs", swaggerUI.serve,swaggerUI.setup(swaggerSpecs));


app.get('/loggerTest', (req, res) => {
    logger.debug("Esto es un mensaje de depuración.");
    logger.http("Esto es un mensaje HTTP.");
    logger.info("Esto es un mensaje de información.");
    logger.warning("Esto es un mensaje de advertencia.");
    logger.error("Esto es un mensaje de error.");
    logger.fatal("Esto es un mensaje fatal.");

    res.send('Registros realizados.');
});


