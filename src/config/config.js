import dotenv from "dotenv";

dotenv.config();

export const config={
    server:{
        port:process.env.PORT,
        secretSession:process.env.SECRET_SESSION,
        persistence: process.env.PERSISTENCE
    },
    fileSystem:{
        productsFile:"products.json",
        cartFile:"carts.json"
    },
    mongo:{
        url:process.env.MONGO_URL,       
    },
    
    github:{
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackUrl:process.env.CALLBACK_URL,
    }
}

// este archivo esta semi-completo