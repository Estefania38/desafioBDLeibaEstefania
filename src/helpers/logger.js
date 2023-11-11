import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const currentEnv = process.env.LOGGER;

// Define los niveles de prioridad
const logLevels = {
    levels:{
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
},
colors: {
    debug: 'cyan bold',
    http: 'green bold',
    info: 'green bold',
    warning: 'yellow bold',
    error: 'magenta bold',
    fatal: 'red bold'
}
}

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

