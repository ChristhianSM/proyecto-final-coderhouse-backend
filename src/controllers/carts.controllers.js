import { cartServices } from "../models/DAOs/daos.js"


export const newCart = (req,res)=>{
    cartServices.new()
    .then(r=>res.send(r))
}

export const deleteCart = (req,res) => {
    let id = req.params.id
    cartServices.delete(id)
    .then(r=>res.send(r))
}

export const getCart = (req,res) => {
    let id = req.params.id
    cartServices.get(id)
    .then(r=>res.send(r.payload ? r : r))
}

export const addProductToCart = (req,res) => {
    let id = req.params.id
    let idProd = req.body.id
    cartServices.add(id,idProd)
    .then(r=>res.send(r))
}

export const deleteProductFromCart = (req,res) => {
    let id = req.params.id
    let idProd = req.params.idProd
    cartServices.deleteProd(id,idProd)
    .then(r=>res.send(r))
}