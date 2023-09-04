import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  console.log(authHeader);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    res.locals.user = decoded.userInfo.username;
    res.locals.roles = decoded.userInfo.roles;
    console.log(res.locals);
    next();
  });
};
