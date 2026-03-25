import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    userName:{type:String},
    title:{type:String},
    description:{type:String},
    category:{type:String,enum:["Technology","Programming","Career/Learning","Cyber Security","Networking"]}, 
    image:{type:String},
    createdAt:{type:Date,default:Date.now()}, 
    comments:{type:Object},
    likes:{type:Object}, 
})

const contentModel = mongoose.model('content',contentSchema)

export default  contentModel