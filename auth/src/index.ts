import express from "express";
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
app.listen(3000, () => {
  console.log(`Listening @ Port ${3000}!`);
});
