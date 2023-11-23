// Importaciones de Express
import express from "express";
import session from "express-session";
import {engine} from "express-handlebars";
import { __dirname } from "./utils.js";
import { swaggerSpecs } from "./config/swagger.config.js";
import swaggerUI from "swagger-ui-express";
import {addLogger } from "./helpers/logger.js"

// Importaciones de Passport
import passport from "passport";
import {initializePassport} from "./config/passportConfig.js";

// Importaciones de Moongose
import MongoStore from "connect-mongo";

// Importaciones de Socket
import { Server } from "socket.io";

// Importaciones de Rutas
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { contactsRouter} from "./routes/contacts.routes.js";
import { businessRouter } from "./routes/business.routes.js";

// Otras importaciones
import {config} from "./config/config.js";
import path from "path";
import FileStore from "session-file-store";
// import compression from "express-compression";


//Configuracion del servidor Express
const app = express();
const logger = addLogger();
// EXPRESS AND SOCKET SERVER RUN
const port = config.server.port || 8080
try {
    const httpServer = app.listen(port,()=>logger.info(`server listening on port ${port}`));
    const io = new Server(httpServer)  

    io.on('connection', (socket)=>{
        logger.info('Socket client conected...')
        
        socket.on('change', (data)=>{
            io.emit('products', data)
        })
        socket.on('send', (data)=>{
            io.emit('messages', data)
        })
    })        
}
catch{
    logger.fatal("ERROR TO ACCESS ON DB");
}



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

// let messages=[];
// //socket server
// io.on("connection",(socket)=>{
//     console.log("nuevo cliente conectado");

//     socket.on("authenticated",(msg)=>{
//         socket.emit("messageHistory", messages);
//         socket.broadcast.emit("newUser",msg);
//     });

//     //recibir el mensaje del cliente
//     socket.on("message",(data)=>{
//         console.log("data", data);
//         messages.push(data);

//         //cada vez que recibamos este mensaje, enviamos todos los mensajes actualizados a todos los clientes conectados
//         io.emit("messageHistory", messages);
//     })
// });






export {app}
