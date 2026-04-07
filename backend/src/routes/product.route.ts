import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", protect, adminOnly, createProduct);
router.get("/all-products", getAllProducts);

export default router;
