import { Router } from "express";//
//import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js"
import { __dirname } from "../utils.js";
import {productService } from "../dao/index.js";

//const pmanagersocket= new ProductsMongo(__dirname, "/files/products.json ");
const router = Router();//

        //routes
        //ruta a home
        router.get("/", (req,res)=>{
            res.render("home");
           
        });

           //ruta a productos en tiempo real
           router.get('/realtimeproducts', async (req,res)=>{
            try{
            const listaproductos = await pmanagersocket.getProducts({})
            console.log(listaproductos);
            res.render("realTimeProducts",{listaproductos:listaproductos});
        }catch(error){
            console.error("Error en la ruta /realTimeProducts:", error);
            res.status(500).send("Error interno del servidor");
        }
        });   

        // corregir la vita del chat
        router.get("/chat",(req,res)=>{
            res.render("chat")
        })

        router.get("/registro", (req,res)=>{
            res.render("signup");
           
        });

        router.get("/productos", async (req,res)=>{
            try{
                const products = await productService.getProducts();
            res.render("products", {products});
            }catch(error){
                res.send("<p>Hubo un error al mostrar los productos, <a href='/'> Ir al Inicio</a></p>");
            }           
        });
   
      
export {router as viewsRouter};









