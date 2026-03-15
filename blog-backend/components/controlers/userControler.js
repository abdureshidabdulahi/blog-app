import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'

const createToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}
const registerUser =async (req,res)=>{
    const {email,password,fristName,lastName} =req.body
   try {
     const user = await userModel.findOne({email})
    if(user){
        console.log('sorry user already exist user another email')
    }
    if(!validator.isEmail(email)){
        console.log('please enter valid email')
    }
    if(password.length < 8){
        console.log('please enter strong password')
    }
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        fullName:fristName + lastName,
        email:email,
        password:hashPass
    })
    await newUser.save()
    const token = createToken(newUser._id)
    res.json({success:true,message:'user registered successfuly',token})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:'error,register can not function properly'})
   }

        
}

const loginUser = async(req,res)=>{
    try {
        const user =await userModel.find({email:req.body.email})
        if(!user){
            console.log('user does not exist')
        }
        const passMatch = await bcrypt.compare(user.password,password)
        if(!passMatch){
            console.log('invlid cridentials')
        }


    } catch (error) {
        console.log(error)
        res.json({success:false,message:'there is aproblem with the login'})
    }
}
export {registerUser}