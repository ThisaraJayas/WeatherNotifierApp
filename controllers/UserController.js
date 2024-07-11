import User from '../models/UserModel.js'
import { getWeatherData } from '../utils/WeatherUtils.js';

export const saveUser = async(req,res)=>{
    const { email, location } = req.body;
    try{
        const user = new User({email,location})
        await user.save()
        res.status(200).json({message:"User Created Success",user: user.location})
    }catch(error){
        res.status(400).json({message:"User Not Created",error})
    }
}

export const getUserWeather = async(req,res)=>{
    const {email} = req.params
    try{
        const user = await User.findOne({email})
        const {data} = await getWeatherData('Colombo','LK')
        res.status(200).json({message:"User Details",weatherData: data})
    }catch(error){

    }
}