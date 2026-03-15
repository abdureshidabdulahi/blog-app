import jwt from 'jsonwebtoken'
import userModel from '../models/userModel'

const authentication = async(req,res)=>{
try {
    const user = await userModel.find({email:req.body.email})
if(user){
    console.log('this email exists please choose another email')
}


} catch (error) {
    
}

}