import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import { __dirname } from "../utils.js";

 

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion api de Ecommers",
            version:"1.0.0",
            description:"API de prueba para el curso de Backend de Coderhouse"
        }
    },
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`],
};

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);