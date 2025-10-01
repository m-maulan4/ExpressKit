import express from "express";
import {
  authLogin,
  authLogout,
  authRegis,
  authToken,
} from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/registertion", authRegis);
authRouter.post("/login", authLogin);
authRouter.get("/logout", authLogout);
authRouter.get("/newToken", authToken);

export default authRouter;
