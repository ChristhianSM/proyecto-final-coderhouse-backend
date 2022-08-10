import mongoose from "mongoose";

const ordersCollection = 'orders'

const orderSchema = new mongoose.Schema({
    items: {type:Array, required:true},
    orderNumber: {type:Number, required:true},
    date: {type:String, required:true},
    state: {type:String, required:true},
    email: {type:String, required:true}
})

export const Order = mongoose.model(ordersCollection,orderSchema)