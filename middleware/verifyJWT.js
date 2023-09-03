export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  next();
};
