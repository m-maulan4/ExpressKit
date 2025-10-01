import express from "express";
import { authRegis } from "../controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/registertion", authRegis);
