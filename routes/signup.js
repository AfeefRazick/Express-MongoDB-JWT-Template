import express from "express";
import { handleNewUser } from "../controllers/signupController.js";

const router = express.Router();

router.route("/signup").post(handleNewUser);

export default router;
