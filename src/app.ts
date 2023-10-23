import { checkOverload } from './helpers/checkConnect';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from './dbs/init.mongodb';
import router from './routes';

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
mongoose;
// checkOverload()

// init route
app.use('/', router);

// handling error
app.use((req: Request, res: Response, next) => {
  const error = new Error('not found');
  error['status'] = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next) => {
  const statusCode = Number(error.status) || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal server error',
  });
});

export default app;
