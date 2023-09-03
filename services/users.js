import express from "express";
import { getUsers } from "../controllers/usersController.js";

export const users = express.Router();

users.route("/users").get(getUsers);
