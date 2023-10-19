import { Request, Response } from 'express';
import { findById } from '../services/apiKey.service';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

export const apiKey = async (req: Request, res: Response, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }
    // check objKey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }
    req['objKey'] = objKey;
    return next();
  } catch (err) {}
};

export const permission = (permission) => {
  return (req, res, next) => {
    if (!req?.['objKey']?.permissions) {
      return res.status(403).json({
        message: 'permission deny',
      });
    }

    const validPermission = req?.['objKey']?.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: 'permission deny',
      });
    }
    return next();
  };
};

export const asyncHandle = (fn) => {
  return (req: Request, res: Response, next) => {
    fn(req, res, next).catch(next);
  };
};
