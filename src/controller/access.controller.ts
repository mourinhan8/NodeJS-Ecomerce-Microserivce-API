import { NextFunction, Request, Response } from 'express';
import AccessService from '../services/access.service';

export default class AccessController {
  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    /*
        200 OK
        201 CREATED
       */
    return res.status(201).json(await AccessService.signUp(req.body));
  };
}
