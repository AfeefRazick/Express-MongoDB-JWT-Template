import express from "express";
import { makeAdmin } from "../controllers/makeAdminController.js";

export const makeAdminRouter = express.Router();

makeAdminRouter.route("/make-admin").get(makeAdmin);
