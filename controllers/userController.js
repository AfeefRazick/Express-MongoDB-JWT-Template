import { UserAuth } from "../models/UserAuth.js";

export const getUser = async (req, res) => {
  const user = await UserAuth.findOne({
    username: res?.locals?.username,
  });

  res.json({ user });
};
