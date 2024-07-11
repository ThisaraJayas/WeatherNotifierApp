import express from "express";
import { saveUser } from "../controllers/UserController.js";
const router = express.Router()

router.post('/add',saveUser)

export default router