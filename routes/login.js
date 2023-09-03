import express from "express";
import { handleLogin } from "../controllers/loginController.js";

export const loginRouter = express.Router();

loginRouter.route("/login").post(handleLogin);
