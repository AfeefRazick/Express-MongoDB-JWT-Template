import { UserAuth } from "../models/UserAuth.js";

// removes refresh token from database and clears refreshToken cookie from client
// jwt accessToken should be cleared from client side
export const handleLogout = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const userFromDB = await UserAuth.findOne({ refreshToken });
  if (!userFromDB) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  userFromDB.refreshToken = "";
  await userFromDB.save();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.sendStatus(204);
};
