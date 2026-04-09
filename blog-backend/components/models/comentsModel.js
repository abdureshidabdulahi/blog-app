import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    contentId: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comment:{type:String,required:true}
})

const commentModel = mongoose.model('comment', commentSchema)

export default commentModel