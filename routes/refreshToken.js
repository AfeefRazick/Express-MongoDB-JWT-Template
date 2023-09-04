import express from "express";
import { handleRefreshToken } from "../controllers/refreshController.js";

export const refreshTokenRouter = express.Router();

refreshTokenRouter.route("/refresh-token").get(handleRefreshToken);
