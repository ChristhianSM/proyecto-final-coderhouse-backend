import dotenv from 'dotenv'
dotenv.config()

let productServices
let cartServices
let messageServices
let orderServices

let db = await import('../mongo/manager/mongoManager.js')
productServices = new db.ProductManager()
cartServices = new db.CartManager()
messageServices = new db.MessageManager()
orderServices = new db.OrdersManager()

export {productServices, cartServices, messageServices, orderServices}