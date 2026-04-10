import express from 'express'
import { handleLikes } from '../controlers/likeComent'
const likeRouter = express.Router()

likeRouter.post('/like',handleLikes)

export default likeRouter