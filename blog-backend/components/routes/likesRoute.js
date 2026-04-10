import express from 'express'
import { handleLikes } from '../controlers/likeComent.js'
import { authentication } from '../middleware/auth.js'

const likeRouter = express.Router()

likeRouter.post('/like',authentication,handleLikes)

export default likeRouter