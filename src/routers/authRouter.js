import express from "express";
import {
  authLogin,
  authLogout,
  authRegis,
  authToken,
} from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/auth/registertion", authRegis);
authRouter.post("/auth/login", authLogin);
authRouter.get("/auth/logout", authLogout);
authRouter.get("/auth/newToken", authToken);

export default authRouter;
