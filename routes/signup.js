import express from "express";
import { handleSignup } from "../controllers/signupController.js";

export const signupRouter = express.Router();

signupRouter.route("/signup").post(handleSignup);
