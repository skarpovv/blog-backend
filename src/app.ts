import express, { Application, Request, Response } from 'express';
import mongoose, { connect } from 'mongoose';
import authRouter from './routes/auth.router';
import blogRouter from './routes/blog.router';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.router';
import authMiddleware from './middlewares/auth-middleware';
dotenv.config();

mongoose.set('strictQuery', false);

const app: Application = express();

const PORT: number = 3001;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use('/auth', authRouter);
app.use('/blogs', blogRouter);
app.use('/users', usersRouter);

const start = async () => {
  try {
    await connect(
      `mongodb+srv://skarpovv:${process.env.DB_KEY}@blog.uhiegp3.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, (): void => {
      console.log('SERVER IS UP ON PORT:', PORT);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
