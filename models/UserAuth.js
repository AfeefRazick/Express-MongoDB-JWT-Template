import mongoose from "mongoose";

// database for confidential user information including authentication and authorization information
const userAuthSchema = new mongoose.Schema({
  username: {
    type: String,
    requried: true,
  },

  password: {
    type: String,
    requried: true,
  },

  roles: [String],

  refreshToken: String,
});

export const UserAuth = mongoose.model("usersauths", userAuthSchema);
