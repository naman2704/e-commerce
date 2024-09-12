import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let response = {
      status: 0,
      message: null,
    };
    if (!name) {
      response.message = "Name is required!";
    } else if (!email) {
      response.message = "Email is required!";
    } else if (!password) {
      response.message = "Password is required!";
    }
    if (!response.message) {
      console.log("Registeration res: ", res);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      response.status = 1;
      response.message = "User created successfully!";
      res.status(201).json(response);
    } else {
      res.status(401).json(response);
    }
  } catch (error) {
    console.log(error);
    // Check for duplicate key error (error code 11000)
    if (error.code === 11000) {
      const key = Object.keys(error.keyValue)[0];
      const uniqueKey = key.charAt(0).toUpperCase() + key.slice(1);
      // This is a duplicate email error
      return res.status(400).json({
        status: 0,
        message: `${uniqueKey} already exists`,
      });
    }
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let respone = {
      status: 0,
      message: null,
    };
    if (!email) {
      respone.message = "Email is required!";
    } else if (!password) {
      respone.message = "Password is required!";
    }
    if (respone.message) {
      return res.status(400).json(respone);
    }
    const user = await User.findOne({ email });
    if (!user) {
      respone.message = "No user found with this email.";
      return res.status(401).json(respone);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      respone.message = "Incorrect password.";
      return res.status(401).json(respone);
    }
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1d",
    });
    respone.status = 1;
    respone.message = "Logged in Successfully!";
    res.status(200).json({ user, token });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 0, message: error.message });
  }
};
