import express from 'express'
import { addProductToCart, deleteCart, deleteProductFromCart, getCart, newCart } from '../controllers/carts.controllers.js'

const router = express.Router()

router.post('/',newCart)

router.delete('/:id',deleteCart)

router.get('/:id/products',getCart)

router.post('/:id/products',addProductToCart)

router.delete('/:id/products/:idProd',deleteProductFromCart)

export default router