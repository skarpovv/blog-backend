import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import authRouter from "./routes/authRouter";

const PASS = "dx11m2wt159cod2";
const app: Application = express();

const PORT: number = 3001;

app.use(express.json());
app.use("/auth", authRouter);

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

const start = async () => {
  try {
    await connect(
      `mongodb+srv://skarpovv:${PASS}@blog.uhiegp3.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, (): void => {
      console.log("SERVER IS UP ON PORT:", PORT);
    });
  } catch (e) {
    console.error(e);
  }
};

console.log("12312");

start();
