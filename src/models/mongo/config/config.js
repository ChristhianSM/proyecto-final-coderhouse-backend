import mongoose from "mongoose";
import log4js from 'log4js'
import dotenv from 'dotenv'

dotenv.config()

log4js.configure({
    appenders: {
        miLoggerConsole: { type: 'console' },
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'info' },
    }
})

let loggerConsole = log4js.getLogger()

const URL = process.env.MONGODB_CNN

export const mongoConfig = mongoose.connect(URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, (err)=>{
    if(err) return console.log(err)
    loggerConsole.info('connected to DB')
})

