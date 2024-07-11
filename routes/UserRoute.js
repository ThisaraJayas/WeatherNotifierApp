import express from "express";
import { getUserWeather, saveUser } from "../controllers/UserController.js";
const router = express.Router()

router.post('/add',saveUser)
router.get('/find/:email',getUserWeather)

export default router