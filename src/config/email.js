import nodemailer from "nodemailer";

const adminEmail= process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

//creamos el transporte para enviar los correos con gmail
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {transporter, adminEmail};