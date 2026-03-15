import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:Number,required:true},
    role:{type:String,required:true,default:'user'},
    profileImage:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()},
    userName:{type:String,required:true}

})

const userModel = mongoose.model('user',userSchema)

export default userModel