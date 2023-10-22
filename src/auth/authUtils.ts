import JWT from 'jsonwebtoken';
import asyncHandler from '../helpers/asyncHandler';
import { Request, Response } from 'express';
import { AuthFailureError, NotFoundError } from '../core/error.response';
import KeyTokenService from '../services/keyToken.service';

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
};

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      // algorithm: 'RS256',
      expiresIn: '2 days',
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: 'RS256',
      expiresIn: '7 days',
    });

    //

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log('Error verify::', err);
      } else {
        console.log('Decode verify::', decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};

export const authentication = asyncHandler(async (req: Request, res: Response, next) => {
  /*
    1 - check userId missing??
    2 - get accessToken
    3 - verify Token
    4 - check user in dbs
    5 - check keyStore with this userId
    6 - OK all => return next()
  */
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailureError('Invalid request');
  }

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) {
    throw new NotFoundError('Not found keyStore');
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];

  if (!accessToken) {
    console.log('vao day');
    throw new AuthFailureError('Invalid request');
  }

  try {
    const decodeUser = JWT.verify(String(accessToken), keyStore.publicKey);
    if (decodeUser?.['userId'] !== userId) {
      throw new AuthFailureError('Invalid user');
    }
    req['keyStore'] = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

export const verifyJWT = (token, keySecret) => {
  return JWT.verify(token, keySecret);
};
