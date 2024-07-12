import mongoose from "mongoose";

export const weatherSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    weather:{
        main:{
            type:String
        },
        description:{
            type:String
        }
    },
    temperature:{
        current: {
            type: Number
        },
        feelsLike:{
            type:Number
        }
    },
    humidity: {
        type: Number,
    },
    pressure: {
        type: Number,
    },
    windSpeed: {
        type: Number,
    },
    clouds: {
        type: Number
    },
})