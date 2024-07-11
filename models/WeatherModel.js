import mongoose from "mongoose";

export const weatherSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    weather:{
        type:String,
        required:true
    }
})