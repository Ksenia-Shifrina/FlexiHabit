import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ExpressError } from './errors/ExpressError';
import habitsRouter from './routes/habitsRoutes';

const app = express();

app.use(cors());
app.use(express.json());

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/flexihabit';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.use('/flexihabit', habitsRouter);
// app.use('/statistic', statisticsRoutes);
// app.use('/', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).json({ message: err.message, status: statusCode });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
