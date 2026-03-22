import express from 'express' 
import { contentFunction } from '../controlers/contentControler.js'
import multer from 'multer'

const contentRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req,file,calback)=>{
        calback(null,'images')
    },
    filename:(req,file,calback)=>{
        
    }
})

contentRouter.post('/savecontent',contentFunction)


export default contentRouter