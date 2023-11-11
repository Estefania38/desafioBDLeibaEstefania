import bcrypt from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
import jwt from "jsonwebtoken";
import { config } from "./config/config.js"

// aca creo la clave secreta del token

const SECRET_TOKEN_KEY =config.token.password;


export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (userDB, password)=>{
   return bcrypt.compareSync(password, userDB.password); 
};

export const generateToken = (userInfo)=>{
    const token = jwt.sign(userInfo,SECRET_TOKEN_KEY);
    return token;
};
export const validateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    if(!authHeader){
        return res.json({status:"error",message:"No autorizado"})
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,SECRET_TOKEN_KEY,(err,payload)=>{
        if(err) return res.json({status:"error", message:"token no valido"});
        req.user = payload;
        next();
    })
}