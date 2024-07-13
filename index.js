import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './routes/UserRoute.js'
import axios from 'axios'
import cron from 'node-cron'
import { sendWeatherReport } from './controllers/WeatherController.js'



const app= express()
app.use(express.json())

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("Database Connected Successfully");
}).catch((error)=>{
    console.log("error : ",error);
})


app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})
app.use('/user',userRouter)

cron.schedule('*/2 * * * *', sendWeatherReport);
console.log("Weather reports will be sent every 3 hours.");