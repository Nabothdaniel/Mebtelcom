import express from 'express';
import { signup,login,logout} from "../controllers/AuthController.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',authenticate, login);
router.post('/logout',authenticate,logout);

export default router;