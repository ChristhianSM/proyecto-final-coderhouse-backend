import { loggerConsole, loggerWarn } from "../services/users.services.js";
import { transporter } from "../services/users.services.js";

export const getHome = async (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/api/products')
    res.render('login')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getSignup = async (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/api/products')
    res.render('signup')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getLogout = async (req,res) => {
    if(req.isAuthenticated()) {
        req.logout((err)=>{if(err) return next(err)})
    }
    res.redirect('/')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

const TEST_MAIL = process.env.TEST_MAIL

export const postSignup = async (req,res) => {
    const mailOptions = {
        from: 'servidor de node js',
        to: TEST_MAIL,
        subject: 'nuevo usuario registrado',
        html: `nuevo usuario
                nombre:${req.body.name}
                email: ${req.body.username}`
    }

    
    try {
        const info = await transporter.sendMail(mailOptions)
        loggerConsole.info(info)
    } catch (err) {
        loggerError.error(error)
        loggerConsole.error(error)        
    }

    res.redirect('/api/products') 

    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const postLogin = async (req,res) => {
    res.redirect('/api/products')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getWrong = async (req,res) => {
    loggerConsole.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
    loggerWarn.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getSessionUser = async (req,res) => {
    res.json(req.session.passport.user)
}