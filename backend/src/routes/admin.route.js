import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controller/admin.controller.js";

const router=Router();

router.use(isLoggedIn, isAdmin); 
// Apply isLoggedIn and isAdmin middleware to all routes in this router

router.get('/check', checkAdmin);

router.post('/songs',isLoggedIn ,isAdmin ,createSong)
router.delete('/songs/:id', deleteSong);

router.post('/albums',isLoggedIn ,isAdmin ,createAlbum)
router.delete('/albums/:id', deleteAlbum);

export default router;