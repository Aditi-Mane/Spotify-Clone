import { Router } from "express";
import { authController } from "../controller/auth.controller.js";

const router=Router();

//to check if user is signing up or logging in
router.post('/callback', authController)

export default router;