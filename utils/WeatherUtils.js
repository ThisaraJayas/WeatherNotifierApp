import axios from "axios"
import { getLocationCoordinates } from "./LocationCordinateUtils.js"
import { GET_WEATHERDATA_URL } from "../url.js"

export const getWeatherData = async(cityName,countryCode)=>{
    try{
        const {lat,lon} = await getLocationCoordinates(cityName,countryCode)
        const response = await axios.get(`${GET_WEATHERDATA_URL}?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
        return {data: response.data}
    }catch(error){
        return {error}
    }
} 