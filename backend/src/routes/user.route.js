import { Router } from "express";
import { getAllUsers } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router=Router();

router.get('/', isLoggedIn, getAllUsers)
//todo: get messages

export default router;