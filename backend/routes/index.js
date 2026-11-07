import { Router } from 'express';
import usersRouter from './users.js';
import routinesRouter from './routines.js';
import authRouter from './auth.js';

const router = Router();

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/routines', routinesRouter);

export default router;
