import express from "express";//
import {config} from "./config/config.js";//
import { __dirname } from "./utils.js";//
import path from "path";//
import {engine} from "express-handlebars";//
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passportConfig.js";
import compression from "express-compression";
// importando mis rutas
import { viewsRouter } from "./routes/views.routes.js";//
import { productsRouter } from "./routes/products.routes.js";//
import { usersRouter } from "./routes/users.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
// import cors from "cors";
import {addLogger } from "./helpers/logger.js"



//inicializando el servidor
const app = express();//
const port = config.server.port;//
const logger = addLogger();

//guardar el servidor http en una variable
app.listen(port,()=>console.log(`server listening on port ${port}`));//

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
// app.use("/api/cart", cartsRouter);
app.use("/api/products",  productsRouter); //compression({brotli:{enabled:true, zlip:{}}})//, productsRouter);
app.use("/api/users", usersRouter);//
app.use("/api/sessions", sessionsRouter);
app.use("/api/cart", cartsRouter);


app.get("/", (req, res)=>{
    logger.fatal("mensaje de nivel fatal");
    logger.error("mensaje de nivel error");
    logger.warning("mensaje de nivel warning");
    logger.info("mensaje de nivel info");
    logger.http("mensaje de nivel http");
    logger.debug("mensaje de nivel debug");
    res.send("peticion recibida");
});

