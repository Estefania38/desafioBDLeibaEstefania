import express from "express";//
import {config} from "./config/config.js";//
import { connectDB } from "./config/dbConnection.js";//
import { __dirname } from "./utils.js";//
import path from "path";//
import {engine} from "express-handlebars";//
// importando mis rutas
import { viewsRouter } from "./routes/views.routes.js";//
import { productsRouter } from "./routes/products.routes.js";//
import { usersRouter } from "./routes/users.routes.js";



//inicializando el servidor
const app = express();//
const port = config.server.port;//

//guardar el servidor http en una variable
app.listen(port,()=>console.log(`server listening on port ${port}`));//
//conectando a la base de datos
connectDB ();//


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

