import { checkOverload } from './helpers/checkConnect';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from './dbs/init.mongodb';

require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? `.env.${process.env.NODE_ENV}` : `.env` });

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db
mongoose
// checkOverload()

// init route
app.get('/', (req: Request, res: Response) => {
  const strCompress = 'Hello world';

  res.status(200).json({
    message: 'Hello World',
    metadata: strCompress.repeat(10000),
  });
});

export default app;
