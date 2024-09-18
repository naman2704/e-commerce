import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token: ", token);

  if (!token) {
    return res.status(401).json({ status: 0, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    const { userId } = decoded;
    const user = await User.findById(userId);
    console.log(user);
    req.user = user; // Attach user info to the request
    next();
  } catch (error) {
    console.log("Error in auth: ", error);
    res.status(401).json({ status: 0, message: "Unauthorized" });
  }
};

export default authMiddleware;
