import axios from "axios"

export const getLocationCoordinates = async(cityName,countryCode)=>{
    const stateCode = ''
    const limit = 5
    try{
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${process.env.WEATHER_API_KEY}`)
        const {lat,lon} = response.data[0]
        return {lat,lon}
    }catch(error){
        return {error}
    }
}