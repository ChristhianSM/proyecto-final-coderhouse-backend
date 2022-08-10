import { productServices } from "../models/DAOs/daos.js";
import { getSessionUser } from "./user.controllers.js";

const productService = productServices

export const isUserLogged = (req,res,next)=> {
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

export const isAdmin = (req,res,next) => {
    getSessionUser.isAdmin == 'false' ? next() : res.send({status:'error',message:'only available as admin'})
} 

export const getProducts = (req,res) => {
    productService.get()
    .then(r=>res.render('home',{data:r.payload,user:req.session.passport.user}))
} 

export const addProduct = (req,res) => {
    let product = req.body
    productService.add(product)
    .then(r=>res.send(r))
}

export const getProductById = (req,res) => {
    let id = req.params.id
    productService.getById(id)
    .then(r=>res.send(r))
}

export const updateProduct = (req,res) => {
    let id = req.params.id
    let updatedProduct = req.body
    productService.update(id,updatedProduct)
    .then(r=>res.send(r))
}

export const deleteProduct = (req,res) => {
    let id = req.params.id
    productService.delete(id)
    .then(r=>res.send(r))
}