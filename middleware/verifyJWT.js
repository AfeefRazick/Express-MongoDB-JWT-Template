import jwt from "jsonwebtoken";

// middleware that verifys the accessToken, if user is authenticated allow access to protected routes
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    res.locals.username = decoded.userInfo.username;
    res.locals.roles = decoded.userInfo.roles;

    next();
  });
};
