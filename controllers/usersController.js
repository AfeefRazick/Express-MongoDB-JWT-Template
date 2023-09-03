import { UserAuth } from "../models/UserAuth.js";

export const getUsers = async (req, res) => {
  console.log(9);
  const users = await UserAuth.find();
  console.log(users);
  res.json({ users });
};
