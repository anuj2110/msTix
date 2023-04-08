import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { errorHandlerMiddleware } from "./middlewares/error-middleware";
import NotFoundError from "./errors/notfound-error";

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017");
    console.log("Connected to DB!!");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log(`Listening @ Port ${3000}!`);
  });
};

start();
