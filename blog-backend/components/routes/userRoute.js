import express from 'express'
import { registerUser,loginUser, listOfUsers } from '../controlers/userControler.js'
import { authentication } from '../middleware/auth.js' 
import userModel from '../models/userModel.js'
import multer from 'multer'


const userRoute = express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/users_list',listOfUsers)

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'userImages/')
    },
    filename:(req,file,cb)=>{
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null,uniqueName)
    }
}) 

const upload = multer({storage})

userRoute.put('/add_profile_image',authentication,upload.single('profileImage'),async(req,res)=>{
    try {
        if(!req.file){
            return res.json({messagge:'file is not found'})
        }
    const updatedUser = await userModel.findByIdAndUpdate(req.userId,
        {profileImage:req.file.filename,
        social_media:{
            youtube:req.body.youtube,
            facebook:req.body.facebook,
            telegram:req.body.telegram,
            bio:req.body.bio,
            whatsApp:req.body.whatsApp, 
    },
    gmail:req.body.gmail,
    userName:req.body.username
},{new:true})
        res.json({message:'image is saved corectly'})
    } catch (error) {
        console.log('error at the save userImage',error)
        res.json({message:'there is a problem'})
    }
})

export default userRoute