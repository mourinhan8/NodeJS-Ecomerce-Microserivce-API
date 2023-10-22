const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created!',
};
export class SuccessResponse {
  message: string;
  status: number;
  metadata: any;
  constructor({ message = '', statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({ message = '', metadata }) {
    super({ message, metadata });
  }
}

export class CREATED extends SuccessResponse {
  options: any;
  constructor({
    options = {},
    message = '',
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}
