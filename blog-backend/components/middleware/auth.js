import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authentication = async(req,res,next)=>{
try {
  const {token} = req.headers
const jwt_decoded = jwt.decode(token,process.env.SECRET_KEY) 
req.userId = jwt_decoded.id
const user = await userModel.findById(jwt_decoded.id)

req.username = user.fullName 
next()
} catch (error) {
    console.log(error)
    next()
}

}

export {authentication}