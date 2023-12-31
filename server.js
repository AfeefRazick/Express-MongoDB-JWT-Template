import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import { signupRouter } from "./routes/signup.js";
import { loginRouter } from "./routes/login.js";
import dotenv from "dotenv";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { users } from "./services/users.js";
import { refreshTokenRouter } from "./routes/refreshToken.js";
import { logoutRouter } from "./routes/logout.js";
import { user } from "./services/user.js";
import { makeAdminRouter } from "./services/makeAdmin.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

// routes that don't require authentication
app.use(signupRouter);
app.use(loginRouter);
app.use(refreshTokenRouter);
app.use(logoutRouter);

app.use(verifyJWT);
//routes that require authentication
app.use(user);
app.use(users);
app.use(makeAdminRouter);

const PORT = process.env.PORT || 3500;

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
