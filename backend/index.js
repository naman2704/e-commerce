import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/mongodb.js";
import authRoutes from "./src/routes/authRoute.js";
import productRoutes from "./src/routes/productRoute.js";
import categoryRoutes from "./src/routes/categoriesRoute.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();
app.use(express.json());
app.use(cors());

/* configuring routes for app */
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ status: 1, message: "Protected route accessed" });
});

connectDB(() => {
  app.listen(PORT, () => {
    console.log(`Server started successfully at port ${PORT}`);
  });
});
