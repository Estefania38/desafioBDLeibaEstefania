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
// importando mis rutas
import { viewsRouter } from "./routes/views.routes.js";//
import { productsRouter } from "./routes/products.routes.js";//
import { usersRouter } from "./routes/users.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";



//inicializando el servidor
const app = express();//
const port = config.server.port;//

//guardar el servidor http en una variable
app.listen(port,()=>console.log(`server listening on port ${port}`));//

//conectar session con filestorage
const fileStorage = FileStore(session);

//configuracion de las sessiones en el servidor
app.use(session({
    store: new MongoStore({
        ttl:60,
        retries:0,
        mongoUrl: "mongodb+srv://esleiba:Mongo3880@cluster0.ttyqoju.mongodb.net/loginLeiba?retryWrites=true&w=majority"
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
//app.use("/api/cart", cartsRouter);
app.use("/api/products", productsRouter);//
app.use("/api/users", usersRouter);//
app.use("/api/sessions", sessionsRouter);



