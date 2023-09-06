import express from "express";
import { getUser } from "../controllers/userController.js";

export const user = express.Router();

user.route("/user").get(getUser);
