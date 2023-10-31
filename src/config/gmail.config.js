import nodemailer from "nodemailer";
import { config } from "./config.js";

//creamos el transporte para enviar los correos con gmail
const gmailTransporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:config.gmail.account,
        pass:config.gmail.password,
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {gmailTransporter};