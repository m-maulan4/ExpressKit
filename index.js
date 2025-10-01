import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
// Router
import usersRouter from "./src/routers/usersRouter.js";
import authRouter from "./src/routers/authRouter.js";

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(usersRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
