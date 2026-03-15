import mongoose from 'mongoose'

const connection = async ()=>{
  await mongoose.connect('mongodb://localhost:27017/Blog-database')
  console.log('database connected successful')
}

export default connection