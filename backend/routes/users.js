import { Router } from 'express';

import getCurrentUser from '../controllers/users.js';

import auth from '../middlewares/auth.js';

const router = Router();

router.get('/me', auth, getCurrentUser);

export default router;
