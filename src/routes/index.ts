import express, { Request, Response } from 'express';
import accessRouter from './access'
import { apiKey, permission } from '../auth/checkAuth';

const router = express.Router();

// check ApiKey
router.use(apiKey);

// check Permission
router.use(permission('0000'));

router.use('/shop', accessRouter)

export default router;