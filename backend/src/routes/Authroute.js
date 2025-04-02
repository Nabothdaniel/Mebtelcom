import express from 'express';
import { signup,login,logout,profile,updateProfile} from "../controllers/AuthController.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login', login);
router.post('/logout',logout);
router.route('/profile:id').get(authenticate,profile).put(authenticate,updateProfile)

export default router;