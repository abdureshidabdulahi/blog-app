import express from 'express'
import { allLikes, handleLikes } from '../controlers/likeComent.js'
import { authentication } from '../middleware/auth.js'

const likeRouter = express.Router()

likeRouter.post('/like',authentication,handleLikes)
likeRouter.post('/all_likes',authentication,allLikes)

export default likeRouter