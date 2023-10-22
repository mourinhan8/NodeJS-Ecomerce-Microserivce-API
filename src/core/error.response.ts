import httpStatusCodes from '../utils/httpStatusCodes';

const { StatusCodes, ReasonPhases } = httpStatusCodes;

class ErrorResponse extends Error {
  status: number;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonPhases.CONFLICT, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonPhases.CONFLICT, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonPhases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}


export class NotFoundError extends ErrorResponse {
  constructor(message = ReasonPhases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonPhases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

// export const errorMiddleware = (error: ErrorResponse, req: Request, res: Response) => {
//   const status = error.status || 500;
//   const message = error.message || 'Internal Server Error';
//   res.status(status).send({
//     message
//   })
// }
