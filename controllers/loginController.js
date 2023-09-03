import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserAuth } from "../models/UserAuth.js";

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password)
    return res.status(400).send("Username or password missing");

  const userFromDB = await UserAuth.findOne({ username: username });
  if (!userFromDB) return res.status(401);

  const passwordMatch = await bcrypt.compare(password, userFromDB.password);
  if (!passwordMatch) return res.status(401);

  if (passwordMatch) {
    const accessToken = jwt.sign(
      {
        userInfo: { username: userFromDB.username, roles: userFromDB.roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      {
        username: userFromDB.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: 60 }
    );
    userFromDB.refreshToken = refreshToken;
    userFromDB.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
      username: userFromDB.username,
      roles: userFromDB.roles,
    });

    console.log(jwt.decode(accessToken));
    console.log(jwt.decode(refreshToken));
  }
};
