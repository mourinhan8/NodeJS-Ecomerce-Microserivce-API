import { checkOverload } from './helpers/checkConnect';
import express from 'express';
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

// init db
mongoose
// checkOverload()

// init route
app.use('/', router);


export default app;
