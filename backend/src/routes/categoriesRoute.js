import { Router } from "express";

import {
  createCategories,
  getAllCategories,
} from "../controllers/categoriesController.js";

const router = Router();

router.post("/update", createCategories);

router.get("/", getAllCategories);

export default router;
