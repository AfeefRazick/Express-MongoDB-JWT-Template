import { allowedOrigins } from "./allowedOrigins.js";

// cors config, setting origin to true if function returns true
// in deployment remove (|| !origin) as this accepts requests that do not have an origin set.. for testing purposes
export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin is not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
