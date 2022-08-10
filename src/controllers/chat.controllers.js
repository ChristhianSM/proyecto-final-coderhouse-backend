import { messageServices } from "../models/DAOs/daos.js";

export const chatPage = (req,res,next) => {
    if(req.isAuthenticated()) return res.render('chat',{userType:req.session.passport.user.isAdmin})
    res.redirect('/')
}

export const obtainEmail = (req,res) => {
    if(req.isAuthenticated()) return res.render('chatPrivate',{userType:req.session.passport.user.isAdmin})
    res.redirect('/')
}