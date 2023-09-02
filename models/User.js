import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export const User = mongoose.model("users", userSchema);
