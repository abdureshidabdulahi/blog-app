import express from 'express'
import { registerUser } from '../controlers/userControler.js'

const userRoute = express.Router()

userRoute.post('/register',registerUser)

export default userRoute