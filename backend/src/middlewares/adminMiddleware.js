// middleware/admin.js
const adminMiddleware = (req, res, next) => {
  const user = req.user; // Assuming the user info is already populated (e.g., from JWT)
  console.log("User: ", user);

  if (user && user.role === "admin") {
    next(); // User is admin, allow access
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export default adminMiddleware;
