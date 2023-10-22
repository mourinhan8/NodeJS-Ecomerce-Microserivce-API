import express from 'express';
import AccessController from '../../controller/access.controller';
import asyncHandler from '../../helpers/asyncHandler';
import { authentication } from '../../auth/authUtils';

const router = express.Router();

router.post('/signUp', asyncHandler(AccessController.signUp));
router.post('/login', asyncHandler(AccessController.login));

// authentication
router.use(authentication);

////////
router.post('/logout', asyncHandler(AccessController.logout));
router.post('/handlerRefreshToken', asyncHandler(AccessController.handlerRefreshToken));

export default router;
