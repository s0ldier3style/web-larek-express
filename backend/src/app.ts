import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import helmet from 'helmet';
import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';

import productRouter from './routes/product';
import orderRouter from './routes/order';
import NotFoundError from './errors/notFoundError';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', productRouter);
app.use('/', orderRouter);

app.use((_req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('listening on port 3000');
});
