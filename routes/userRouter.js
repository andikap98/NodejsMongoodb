import express from 'express';
import { getAllUser, signUp, loginUser, logOutUser } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/", verifyToken,getAllUser)
router.post("/signup", signUp);
router.post("/login", loginUser);
router.delete("/logout", logOutUser);


export default router;