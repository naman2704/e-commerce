import express from "express";

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/add-product", createProduct);

router.post("/update-product/:id", updateProduct);

router.delete("/delete-product/:id", deleteProduct);

export default router;
