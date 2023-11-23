import bcrypt from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
import jwt from "jsonwebtoken";
import { config } from "./config/config.js"

// aca creo la clave secreta del token

const SECRET_TOKEN_KEY = config.token.password;


export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (userDB, password) => {
    return bcrypt.compareSync(password, userDB.password);
};

export const generateToken = (userInfo) => {
    const token = jwt.sign(userInfo, SECRET_TOKEN_KEY);
    return token;
};
export const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.json({ status: "error", message: "No autorizado" })
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_TOKEN_KEY, (err, payload) => {
        if (err) return res.json({ status: "error", message: "token no valido" });
        req.user = payload;
        next();
    })
};

//filtro para nuestra carga de imagenes de perfil
const multerProfileFilter = (req, file, cb) => {
    const valid = checkValidFields(req.body);
    if (valid) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//configuracion para guardar las imagenes de los usuarios
const profileStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/users/img"))
    },
    //con que nombre vamos a guardar el archivo.
    filename: function (req, file, cb) {
        cb(null, `${req.body.email}-perfil-${file.originalname}`)
    }
});
//creamos uploader de profiles images
export const uploaderProfile = multer({ storage: profileStorage, fileFilter: multerProfileFilter });


//configuracion para guardar las imagenes de los productos
const productsStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/products/img"))
    },
    //con que nombre vamos a guardar el archivo.
    filename: function (req, file, cb) {
        cb(null, `${req.body.code}-product-${file.originalname}`)
    }
});
//creamos uploader de images de productos
export const uploaderProduct = multer({ storage: productsStorage });


//configuracion para guardar los documentos de los usuarios
const documentsStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/users/documents"))
    },
    //con que nombre vamos a guardar el archivo.
    filename: function (req, file, cb) {
        cb(null, `${req.user.email}-documento-${file.originalname}`)
    }
});
//creamos uploader de profiles images
export const uploaderDocuments = multer({ storage: documentsStorage });

