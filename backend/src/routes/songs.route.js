import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import {isLoggedIn, isAdmin} from "../middleware/auth.middleware.js"; 

const router=Router();

router.get('/',isLoggedIn, isAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);

export default router;