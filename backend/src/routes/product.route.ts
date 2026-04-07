import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", protect, createProduct);

export default router;
