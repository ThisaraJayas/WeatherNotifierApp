import express from "express";
import { getUserWeather, getWeatherByDate, saveUser, updateUserLocation } from "../controllers/UserController.js";
const router = express.Router()

router.post('/add',saveUser)
router.get('/find/:email',getUserWeather)
router.put('/update/:email',updateUserLocation)
router.get('/find/:email/:date', getWeatherByDate);

export default router