import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now /* Set the default value as the current date and time */,
  },
});

const User = model("user", userSchema);

export default User;
