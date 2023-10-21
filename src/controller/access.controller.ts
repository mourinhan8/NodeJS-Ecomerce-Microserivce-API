import { NextFunction, Request, Response } from 'express';
import AccessService from '../services/access.service';
import { OK, CREATED } from '../core/success.response';
export default class AccessController {
  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    /*
      200 OK
      201 CREATED
    */

    new CREATED({
      message: 'Registed OK!',
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}
