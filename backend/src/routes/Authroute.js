import express from 'express';
import { signup,login,authenticate } from "../controllers/AuthController.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',authenticate, login);

export default router;