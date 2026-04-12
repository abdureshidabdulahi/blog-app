import express from 'express' 
import { contentFunction, all_contentLists, userBlog, addComment } from '../controlers/contentControler.js'
import multer from 'multer'
import { authentication } from '../middleware/auth.js'

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

contentRouter.post('/savecontent',images.single('image'),authentication,contentFunction)
contentRouter.post('/myblogs',authentication,userBlog)
contentRouter.get('/getcontent',all_contentLists)
// Route for adding comments to a post
contentRouter.post('/addcomment',authentication,addComment)


export default contentRouter