import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { USERROLE } from "../config/roles.js";
import { UserAuth } from "../models/UserAuth.js";

export const handleSignup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username or password missing");

  const isDuplicate = await UserAuth.findOne({ username: username });
  if (isDuplicate) return res.sendStatus(409);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserAuth.create({
    username,
    password: hashedPassword,
    roles: [USERROLE],
  });

  res.status(201).json({ success: `New user ${newUser} created!` });
  console.log(newUser);
};
