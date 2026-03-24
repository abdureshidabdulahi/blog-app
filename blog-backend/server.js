import express from 'express'
import connection from './connectDB.js'
import cors from 'cors'
import 'dotenv/config' 
import userRoute from './components/routes/userRoute.js'
import contentRouter from './components/routes/contentRoute.js'

const app = express()
connection()
app.use('/images',express.static('images'))
app.use(cors())
app.use(express.json())
app.use('/api/users',userRoute)
app.use('/api/user',contentRouter)





app.listen(5137,()=>{
    console.log('server is running at port 5137')
})