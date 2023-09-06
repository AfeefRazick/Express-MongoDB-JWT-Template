import jwt from "jsonwebtoken";
import { UserAuth } from "../models/UserAuth.js";

export const handleRefreshToken = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  const userFromDB = await UserAuth.findOne({ refreshToken: refreshToken });
  if (!userFromDB) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { userInfo: { username: userFromDB.username, roles: userFromDB.roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 15 }
    );

    res.json({
      accessToken,
      username: userFromDB.username,
      roles: userFromDB.roles,
    });
  });
};
