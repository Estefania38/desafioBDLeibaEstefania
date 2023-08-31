import { Router } from "express";//
import { __dirname } from "../utils.js";
import {productService } from "../dao/index.js";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";

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

        router.get("/registro",showLoginView, (req,res)=>{
            res.render("signup");
           
        });

        router.get("/login", showLoginView, (req,res)=>{
            res.render("login");
        });

        router.get("/perfil", checkUserAuthenticated, (req,res)=>{
            console.log(req.user);
            res.render("profile",{user: JSON.parse(JSON.stringify(req.user))});
        });
        

        router.get("/productos",async(req,res)=>{
            try {
                const {limit=10,page=1,stock,sort="asc"} = req.query;
                const stockValue = stock === 0 ? undefined : parseInt(stock);
                if(!["asc","desc"].includes(sort)){
                    return res.render("products", {error:"Orden no válido"})
                };
                const sortValue = sort === "asc" ? 1 : -1;
                let query = {};
                if(stockValue){
                    query = {category:"categoria",stock:{$gte:stockValue}}
                }
                 const result = await productService.getWithPaginate(query,{
                    page,
                    limit,
                    sort:{price:sortValue},
                    lean: true
                });
                // console.log(result);
                // asi capturo la ruta de mi servidor capturo el protocolo"http" y el host: "localhost"
                 const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
                 const resultProductsView = {
                   status:"success",
                   payload: result.docs,
                   totalPages: result.totalPages,
                   page: result.page,
                   prevPage: result.prevPage,
                   hasPrevPage: result.hasPrevPage,
                   prevLink: result.hasPrevPage ? baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`) : null,
                   nextPage: result.nextPage,
                   hasNextPage: result.hasNextPage,
                   nextLink: result.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${result.page}`, 
                   `page=${result.nextPage}`) : baseUrl.includes("?") ? baseUrl.concat(`&page=${result.nextPage}`) : 
                   baseUrl.concat(`?page=${result.nextPage}`) : null
               }
               console.log(resultProductsView);
                res.render("products", resultProductsView);
            } catch (error) {
                console.log(error.message)
                res.render("products",{error:"No es posible visualizar los productos"});
            }
        });
        router.get("/cambiar-password", (req, res) => {
            res.render("changePassword");
        })
   
      
export {router as viewsRouter};









