import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
import { createSong } from "../controller/admin.controller.js";

const router=Router();

router.post('/songs',isLoggedIn ,isAdmin ,createSong )

export default router;