import { ADMINROLE } from "../config/roles.js";
import { UserAuth } from "../models/UserAuth.js";

export const makeAdmin = async (req, res) => {
  try {
    const userFromDB = await UserAuth.findOne({
      username: res?.locals?.username,
    });

    userFromDB.roles.push(ADMINROLE);
    userFromDB.save();

    return res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};
