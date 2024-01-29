import express from 'express';
import { getAllUser, signUp, loginUser } from '../controller/userController.js';
import { verifyToken, logLoginUser } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/", verifyToken,getAllUser,logLoginUser)
router.post("/signup", signUp);
router.post("/login", loginUser);


export default router;