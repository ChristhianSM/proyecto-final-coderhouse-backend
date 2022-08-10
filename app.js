import express from "express";
import productsRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/carts.routes.js'
import userRouter from './src/routes/user.routes.js'
import chatRouter from './src/routes/chat.routes.js'
import {dirname} from 'path'
import { fileURLToPath } from "url";
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import { Server } from "socket.io";
import { mongoConfig } from "./src/models/mongo/config/config.js";
import { loggerConsole } from "./src/services/users.services.js";
import { socket } from "./src/services/websockets.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/src/public'))

app.set('views', __dirname+'/src/views')
app.set('view engine', 'ejs')

// SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
    cookie:{
        expires: 500000
    }
}))
// IMPLEMENTACION PASSPORT
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products',productsRouter)
app.use('/api/cart',cartRouter)
app.use('/',userRouter)
app.use('/api/chat',chatRouter)

export const server = app.listen(PORT,()=>{
    loggerConsole.info(`Listening on ${PORT}`)
})

export const io = new Server(server)

io.on('connection', socket)
