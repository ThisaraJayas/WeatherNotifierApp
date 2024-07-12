import axios from "axios"
import { getLocationCoordinates } from "./LocationCordinateUtils.js"

export const getWeatherData = async(cityName,countryCode)=>{
    try{
        const {lat,lon} = await getLocationCoordinates(cityName,countryCode)
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
        return {data: response.data}
    }catch(error){
        return {error}
    }
} 