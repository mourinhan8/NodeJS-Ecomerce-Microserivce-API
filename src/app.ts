import express, { Request, Response } from 'express';
import { createServer } from 'http';
import morgan from 'morgan';

require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? `.env.${process.env.NODE_ENV}` : `.env` });

const app = express();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) =>
  res.status(200).json({
    message: 'Hello World',
  }),
);

const server = createServer(app);

server.listen(process.env.APP_PORT, () => {
  console.log(`Streaming app listening on port ${process.env.APP_PORT}`);
});
