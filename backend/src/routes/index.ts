import { Router } from "express";
import authRoutes from "../routes/auth.route";
import productRoutes from "../routes/product.route";
import uploadRoutes from "../routes/upload.routes";
const router = Router();
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/upload", uploadRoutes);

export default router;
