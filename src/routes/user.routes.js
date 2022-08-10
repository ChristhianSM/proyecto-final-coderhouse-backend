import { getHome, getLogout, getSessionUser, getSignup, postLogin, postSignup } from "../controllers/user.controllers.js"
import express from 'express'
import { uploader } from "../services/uploader.js"
import passport from "passport"
import { loggerConsole } from "../services/users.services.js"
import os from 'os'

const router = express.Router()

router.get('/',getHome)

router.get('/signup',getSignup)

router.post('/signup',uploader.single('file'),passport.authenticate('signupStrategy',{
    failureRedirect: '/signup',
}),postSignup)

router.post('/login',uploader.single('file'),passport.authenticate('loginStrategy',{
    failureRedirect: '/',
}),postLogin)

router.get('/logout',getLogout)

router.get('/req',getSessionUser)

router.get('/info',(req,res)=>{
    const info = {
        PORT: process.env.PORT || 8080,
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage,
        path: process.execPath,
        pid: process.pid,
        folder: process.env.PWD,
        enviroment: process.env.NODE_ENV,
        cpus: os.cpus().length
    }
    res.send(info)
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})


export default router