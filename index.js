import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './routes/UserRoute.js'

const app= express()
app.use(express.json())

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("Database Connected Successfully");
}).catch((error)=>{
    console.log("error : ",error);
})

app.get('/',(req,res)=>{
    console.log("Hello");
})
app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})

app.use('/user',userRouter)