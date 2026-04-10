import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    userName:{type:String},
    title:{type:String},
    description:{type:String},
    category:{type:String,required:true}, 
    image:{type:String},
    createdAt:{type:Date,default:Date.now()}, 
     comments: [
  {
    userId: String,
    userName: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
],
    likes: [
  {
    userId: String
  }
], 
},{minimize:false})

const contentModel = mongoose.model('content',contentSchema)

export default  contentModel