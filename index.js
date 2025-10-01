import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import usersRouter from "./src/routers/usersRouter.js";

// Router

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
