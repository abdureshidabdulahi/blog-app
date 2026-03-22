import express from 'express' 
import { contentFunction } from '../controlers/contentControler.js'
import multer from 'multer'

const contentRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req,file,calback)=>{
        calback(null,'images')
    },
    filename:(req,file,calback)=>{
        calback(null,`${Date.now()}${file.originalname}`)
    }
})

const images = multer({storage:storage})

contentRouter.post('/savecontent',images.single('image'),contentFunction)


export default contentRouter