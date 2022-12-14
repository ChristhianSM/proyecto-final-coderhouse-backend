import { productsService } from "../models/products.js";
import { cartsService } from "../models/carts.js";
import { Message } from "../models/messages.js";
import { Order } from "../models/orders.js";


export class ProductManager {
    add = async (product) => {
        if(!product.name||!product.description||!product.code||!product.image||!product.price||!product.stock)return{status:'error',message:'data mising'}
        let exist = await productsService.find({code:product.code})
        if(exist.length != 0) return {status:'error',message:'product already added'}
        product.timestamp = Date.now()
        await productsService.insertMany(product)
        return {status:'succes',message:'product added'}
    }

    get = async () => {
        let payload = await productsService.find({},{__v:0})
        return {status:'success',payload:payload}
    }

    getById = async (id) => {
        if(!id) return {status:'error', message:'ID nedded'}
        try {
            let result = await productsService.find({_id:id})
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:'error',error:'ID not found'}
        }
    }

    update = async (id,updatedProduct) => {
        if(!id) return {status: 'error', error:'Id nedded'}
        if(!updatedProduct.name||!updatedProduct.description||!updatedProduct.code||!updatedProduct.image||!updatedProduct.price||!updatedProduct.stock)return{status:'error',message:'data mising'} 
        try {
           let result = await productsService.updateOne({_id:id},{$set:updatedProduct})
           return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error}
        }
    }

    delete = async (id) => {
        if(!id) return {status: 'error', error:'Id needed'}
        try {
            let result = await productsService.deleteOne({_id:id})
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error}
        }
    }
}

export class CartManager {
    new = async () => {
        try {
            let cart = {}
            cart.timestamp = Date.now()
            cart.products = []
            let result = await cartsService.insertMany(cart)
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error}
        }
    }

    delete = async (id) => {
        if(!id) return {status: 'error', error:'Id needed'}
        try {
            let result = await cartsService.deleteOne({_id:id})
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error}
        }
    }

    get = async (id) => {
        try {
            if(!id) return {status: 'error', error:'Id needed'}
            let result = await cartsService.find({_id:id})
            return {status:'succes',payload:result}
        } catch {
            return {status:"error",error:error}
        }
    }

    add = async (id,idProd) => {
        if(!id) return {status: 'error', error:'Id nedded'}
        if(!idProd) return {status:'error', message:'Id of product nedded'}
        try {
            let prod = await productsService.find({_id:idProd},{_id:1,__v:0,name:0,description:0,code:0,image:0,price:0,stock:0,timestamp:0})
            let cart = await cartsService.find({_id:id},{_id:0,timestamp:0,__v:0})
            let ids = []
            let exist = 0
            cart[0].products.forEach(el => {
                let id = el
                ids.push(id)
            })
            exist = ids.find(id => id == idProd)
            if(exist) return {status:'error',message:'product already added to cart'+exist}
            let result = await cartsService.updateOne({_id:id},{$push:{products:prod[0]._id.toString()}})
            exist = 0
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error} 
        }
    }

    deleteProd = async (id,idProd) => {
        if(!id) return {status: 'error', error:'Id needed'} 
        if(!idProd) return {status: 'error', error:'Id of product nedded'}
        try {
            let result = await cartsService.updateOne({_id:id},{$pull:{products:idProd}})
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error} 
        }
    }
}

export class MessageManager {
    addMessage = async (email,type,body) => {
        if(!email || !type || !body) return {status: 'error', message: 'data missing'}
        try {
            let obj = {}
            let date = new Date()
            let y = date.getFullYear()
            let m = date.getMonth()+1
            let d = date.getDate()
            let h = date.getHours()
            let min = date.getMinutes()
            obj.email = email
            obj.type = type
            obj.body = body
            obj.date = `${y}/${m}/${d} ${h}:${min}`
            let result = await Message.insertMany(obj)
            return {status:'succes',payload:result}
        } catch (error) {
            return {status:"error",error:error}
        }
    }

    getMessages = async () => {
        let payload = await Message.find({},{__v:0})
        return {status:'success', payload:payload}
    }

    getMessagesByEmail = async (email) => {
        let payload = await Message.find({email:''+email},{__v:0})
        return {status:'success', payload:payload}
    }
}

export class OrdersManager {
    addOrder = async (obj) => {
        let order = {}
        let ordersQty = await (await Order.find({})).length
        if(ordersQty == 0){
            order.orderNumber = 1
        }else {
            order.orderNumber = ordersQty+1
        }
        order.date = new Date()
        order.state = 'created'
        order.email = obj.email
        order.items = obj.items

        let saveOrder = await Order.insertMany(order)
        return {status:'success',payload:saveOrder}
    }
}