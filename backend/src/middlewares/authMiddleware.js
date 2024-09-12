import jwt from "jsonwebtoken";

const authMiddleware = (rea, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 0, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ status: 0, message: "Unauthorized" });
  }
};

export default authMiddleware;
