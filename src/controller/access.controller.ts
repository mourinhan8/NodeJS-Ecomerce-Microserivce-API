import { NextFunction, Request, Response } from 'express';
import AccessService from '../services/access.service';
import { OK, CREATED, SuccessResponse } from '../core/success.response';
export default class AccessController {
  static handlerRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      metadata: await AccessService.handlerRefreshToken(req.body.refreshToken),
      message: 'Get token success',
    }).send(res);
  };
  static logout = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      metadata: await AccessService.logout({ keyStore: req['keyStore'] }),
      message: 'Logout success!',
    }).send(res);
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({ metadata: await AccessService.login(req.body) }).send(res);
  };

  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    /*
      200 OK
      201 CREATED
    */

    new CREATED({
      message: 'Registered OK!',
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}
