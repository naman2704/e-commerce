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

export const getAllUsers = async (req, res) => {
  try {
    const users = (await User.find()).filter((user) => user.role !== "admin");
    const response =
      users.length > 0
        ? { status: 1, users }
        : { status: 0, message: "No user exists" };
    res.json(response);
  } catch (error) {
    res.json({
      status: 0,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = {
      status: 0,
      message: null,
    };
    if (!email) {
      response.message = "Email is required!";
    } else if (!password) {
      response.message = "Password is required!";
    }
    if (response.message) {
      return res.status(400).json(response);
    }
    const user = await User.findOne({ email });
    if (!user) {
      response.message = "No user found with this email.";
      return res.status(401).json(response);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      response.message = "Incorrect password.";
      return res.status(401).json(response);
    }
    const { accessToken, refreshToken } = generateTokens(user);
    response.status = 1;
    response.message = "Logged in Successfully!";
    res.status(200).json({
      ...response,
      user,
      tokens: { accessToken, refreshToken },
      expiresIn: timeToSeconds(process.env.ACCESS_TOKEN_EXPIRE_TIME),
      expiresIn_: timeToSeconds(process.env.REFRESH_TOKEN_EXPIRE_TIME),
    });
  } catch (error) {
    res
      .status(error?.status || 401)
      .json({ status: 0, message: error.message });
  }
};

export const reLoginUser = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    let response = {
      status: 0,
      message: null,
    };
    const decodedToken = isTokenValid(refreshToken, "refresh_token");
    if (decodedToken) {
      const { userId } = decodedToken;
      const user = await User.findById(userId);
      const { accessToken, refreshToken } = generateTokens(user);
      if (user?.role) {
        response.status = 1;
        response.message = "Re-Logged in Successfully!";
        res.status(200).json({
          ...response,
          user,
          tokens: { accessToken, refreshToken },
          expiresIn: timeToSeconds(process.env.ACCESS_TOKEN_EXPIRE_TIME),
          expiresIn_: timeToSeconds(process.env.REFRESH_TOKEN_EXPIRE_TIME),
        });
      }
    }
    res.json(response);
  } catch (error) {
    console.log("Error occured while relogging in!");
    res.status(401).json({
      status: 0,
      message: "Re-login failed! Please login again",
    });
  }
};

export const getLoggedInUserInfo = async (req, res) => {
  let response = {
    status: 0,
    message: null,
  }
  try {
    const accessToken = req.body.accessToken;
    if (accessToken) {
      const decodedToken = isTokenValid(accessToken, "access_token");
      const userId = decodedToken;
      if (userId) {
        const user = await User.findById(userId);
        if (user?,role) {

        }
      }
    }
  } catch (error) {
    
  }
}

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    }
  );
  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    }
  );
  return { accessToken, refreshToken };
};

const isTokenValid = (token, tokenType = "access_token") => {
  let secretKey = null;
  switch (tokenType) {
    case "access_token":
      secretKey = process.env.JWT_SECRET;
      break;
    case "refresh_token":
      secretKey = process.env.REFRESH_TOKEN_SECRET;
      break;
  }
  if (secretKey) {
    try {
      const decoded = jwt.verify(token, secretKey); // Verifies the signature and expiration
      console.log("Token is valid", decoded);
      return decoded; // Return the decoded token if valid
    } catch (error) {
      console.error("Invalid token:", error.message);
      return null; // Token is invalid
    }
  }
};
