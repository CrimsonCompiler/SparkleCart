import { Router } from "express";
import authRoutes from "../routes/auth.route";
import productRoutes from "../routes/product.route";
import uploadRoutes from "../routes/upload.routes";
import cartRoutes from "../routes/cart.route";
const router = Router();
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/upload", uploadRoutes);
router.use("/cart", cartRoutes);

export default router;
