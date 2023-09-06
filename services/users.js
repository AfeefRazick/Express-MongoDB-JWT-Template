import express from "express";
import { getUsers } from "../controllers/usersController.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { ADMINROLE } from "../config/roles.js";

export const users = express.Router();

users.route("/users").get(verifyRoles([ADMINROLE]), getUsers);
