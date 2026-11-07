import { Router } from 'express';
import { createUser, login } from '../controllers/auth.js';
import { validateSignup, validateSignin } from '../middlewares/validation.js';

const router = Router();

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

export default router;
