import { UserAuth } from "../models/UserAuth.js";

export const getUsers = async (req, res) => {
  const users = await UserAuth.find();

  res.json({ users });
};
