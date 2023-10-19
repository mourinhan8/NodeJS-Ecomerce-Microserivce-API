import express from 'express';
import AccessController from '../../controller/access.controller';
import { asyncHandle } from '../../auth/checkAuth';

const router = express.Router();

router.post('/signUp', asyncHandle(AccessController.signUp));

export default router;
