import express from 'express'
import { addProduct, deleteProduct, getProductById, getProducts, isAdmin, isUserLogged, updateProduct } from '../controllers/products.controllers.js'

const router = express.Router()

router.get('/',isUserLogged,getProducts)

router.post('/',isAdmin,addProduct)

router.get('/:id',getProductById)

router.put('/:id',isAdmin,updateProduct)

router.delete('/:id',isAdmin,deleteProduct)

export default router