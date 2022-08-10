import mongoose from 'mongoose'


const messagesColecction = 'messages'

const messageSchema = new mongoose.Schema({
    email: {type:String, required:true},
    type: {type:String, required:true},
    date: {type:String, required:true},
    body: {type:String, required:true}
})

export const Message = mongoose.model(messagesColecction,messageSchema)