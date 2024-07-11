import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './routes/UserRoute.js'
import axios from 'axios'

const app= express()
app.use(express.json())

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("Database Connected Successfully");
}).catch((error)=>{
    console.log("error : ",error);
})

async function getLocationCoordinates(cityName, countryCode) {
    try{
        
        const stateCode = ''; // State code is only required for the US
       
        const limit = 5; 
        const resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${process.env.API_KEY}`)
        const{lat,lon}=resp.data[0]
        
        return{lat,lon}
    }catch(error){
        res.status(400).json({message:"error Loca ",error})
    }
    
}
app.get('/man',async(req,res)=>{
    try{
        const cityName = 'Colombo';
    const countryCode = 'LK';
        const {lat,lon} = await getLocationCoordinates(cityName,countryCode)
        const man = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`)
        res.status(200).json({message:"god Loca ",data:man.data})
    
    }catch(error){
        res.status(400).json({message:"error Loca ",error})
    }
})
app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})

app.use('/user',userRouter)