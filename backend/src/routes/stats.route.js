import { Router } from "express";
import {isLoggedIn, isAdmin} from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stats.controller.js";

const router=Router();

router.get('/', isLoggedIn, isAdmin, getStats);

export default router;