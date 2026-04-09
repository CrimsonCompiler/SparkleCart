import { Router } from "express";
import authRoutes from "../routes/auth.route";
import productRoutes from "../routes/product.route";
import uploadRoutes from "../routes/upload.routes";
import cartRoutes from "../routes/cart.route";
import orderRoutes from "../routes/order.route";
const router = Router();
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/upload", uploadRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

export default router;
