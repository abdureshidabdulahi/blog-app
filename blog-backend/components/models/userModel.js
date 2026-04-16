import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'user'},
    profileImage:{type:String,default:''},
    createdAt:{type:Date,default:Date.now()},
    userName:{type:String,default:''}, 
    gmail:{type:String,default:''}

},{minimize:false})

const userModel = mongoose.model('user',userSchema)

export default userModel