import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const currentEnv = process.env.LOGGER;
//crear el transporte : sistema de almacenamiento

const devLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"debug"})
       ]
});

const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:"./logs/errors.log", level:"error"})
    ]
});

export const addLogger = ()=>{
    let logger;
    if(currentEnv === "development"){
        logger = devLogger;
    }else{
        logger: prodLogger;
    };
    return logger;
};

