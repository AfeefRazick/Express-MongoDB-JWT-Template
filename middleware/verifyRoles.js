export const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    const userRoles = res?.locals?.roles;
    if (!userRoles) return res.sendStatus(401);

    const allowed = allowedRoles.some((allowedRole) =>
      userRoles.includes(allowedRole)
    );
    if (!allowed) return res.sendStatus(403);

    next();
  };
};
