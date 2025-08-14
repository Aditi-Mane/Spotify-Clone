import { Router } from "express";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router=Router();

router.get('/', isLoggedIn, getAllUsers)
router.get("/messages/:userId", isLoggedIn, getMessages)

export default router;