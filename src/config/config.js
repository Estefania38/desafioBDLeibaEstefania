export const config={
    server:{
        port:8080,
        secretSession:"claveSecretaCoder"
    },
    fileSystem:{
        productsFile:"products.json",
        cartFile:"carts.json"
    },
    mongo:{
        url:"mongodb+srv://esleiba:Mongo3880@cluster0.ttyqoju.mongodb.net/ecommerce1Leiba?retryWrites=true&w=majority"
    },
    github:{
        clientId:"Iv1.16085d43bbb5f146",
        clientSecret: "75e5b1b0c2c4eccee8ac36ba60627de299772263",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback",
    }
}

// este archivo esta semi-completo