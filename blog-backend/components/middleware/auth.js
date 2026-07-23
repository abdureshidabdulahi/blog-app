import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


const authentication = async(req,res,next)=>{

    try {

        const token = req.headers.token;


        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token provided"
            });
        }


        const jwt_decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );


        const user = await userModel.findById(jwt_decoded.id);


        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        req.userId = jwt_decoded.id;
        req.username = user.fullName;


        next();


    } catch(error){

        console.log(error);

        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });

    }

}


export {authentication};