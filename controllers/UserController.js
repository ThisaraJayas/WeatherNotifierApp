import User from '../models/UserModel.js'
import { getWeatherData } from '../utils/WeatherUtils.js';

export const saveUser = async(req,res)=>{
    const { email, location } = req.body;
    try{
        const user = new User({email,location})

        const [city, countryCode] = location.split(',').map(part => part.trim());
        const {data} = await getWeatherData(city,countryCode)

        const tempCelsius = (data.main.temp - 273.15).toFixed(0)
        const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(0)

        user.weatherInfo.push({
            date: new Date(),
            weather:{
                main: data.weather[0].main,
                description: data.weather[0].description
            },
            temperature: {
                current: tempCelsius,
                feelsLike: feelsLikeCelsius
            },
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            clouds:data.clouds.all,

        })
        await user.save()
        res.status(200).json({message:"User Created Success",user: user})
    }catch(error){
        res.status(400).json({message:"User Not Created",error})
    }
}
// export const getUserWeather = async(req,res)=>{
//     const {email} = req.params
//     try{
//         const user = await User.findOne({email})
//         const [city, countryCode] = user.location.split(',').map(part => part.trim());
//         const {data} = await getWeatherData(city,countryCode)
//         res.status(200).json({message:"User Details",user,weatherData: data})
//     }catch(error){

//     }
// }
export const getUserWeather = async(req,res)=>{
    const {email} = req.params
    try{
        const user = await User.findOne({email})
        res.status(200).json({message:"User Details",user})
    }catch(error){

    }
}
export const updateUserLocation = async(req,res)=>{
    const {email} = req.params
    const {location}=req.body

    try{
        const user = await User.findOneAndUpdate({email},{location:location},{new:true})
        res.status(200).json({ message: "User Location Updated Successfully", user })
    }catch(error){
        res.status(400).json({ message: "Error Updating User Location", error });
    }
}