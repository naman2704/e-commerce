import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { getAllUsers } from "../controllers/usersController.js";

const router = Router();

// admin-only route
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

export default router;
