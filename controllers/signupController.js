import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const handleNewUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Email or password missing");

  const isDuplicate = await User.findOne({ username: username });

  if (isDuplicate) return res.sendStatus(409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });
  res.status(201).json({ success: `New user ${newUser} created!` });
  console.log(newUser);
};
