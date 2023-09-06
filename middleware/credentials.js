import { allowedOrigins } from "../config/allowedOrigins.js";

// adds header to prevent cors error since origin is being checked
export const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
