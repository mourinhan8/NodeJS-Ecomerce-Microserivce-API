import express from 'express';
import AccessController from '../../controller/access.controller';
import asyncHandler from '../../helpers/asyncHandler';
import { authentication, authenticationRefreshToken } from '../../auth/authUtils';

const router = express.Router();

router.post('/signUp', asyncHandler(AccessController.signUp));
router.post('/login', asyncHandler(AccessController.login));

// handler refresh token
router.post('/handlerRefreshToken', authenticationRefreshToken, asyncHandler(AccessController.handlerRefreshToken));
// authentication
router.use(authentication);
////////
router.post('/logout', asyncHandler(AccessController.logout));

export default router;
