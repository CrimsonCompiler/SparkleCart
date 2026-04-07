import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", protect, adminOnly, createProduct);
router.get("/all-products", getAllProducts);
router.get("/:id", getProductById);

export default router;
