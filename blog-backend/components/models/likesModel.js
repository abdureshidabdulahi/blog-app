import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    contentId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes:{type:Number,required:true}
})

const likeModel = mongoose.model('like', likeSchema)

export default likeModel