import mongoose from "mongoose";
import { weatherSchema } from "./WeatherModel";

const userSchema = new new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true,
        unique:true
    },
    weatherInfo:[weatherSchema]
})
const User = mongoose.model('User',userSchema)
export default User