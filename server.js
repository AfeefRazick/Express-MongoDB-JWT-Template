import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import signupRouter from "./routes/signup.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(signupRouter);

app.listen(PORT, () => {
  console.log("Server running on Port", PORT);
});

mongoose
  .connect(process.env.MONGODB_CONNECT_URL)
  .then(() => {
    console.log("Connected to MongoDB server successfully");
  })
  .catch((err) => {
    console.log(err);
  });
