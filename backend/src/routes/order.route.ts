import { Router } from "express";
import { adminOnly, protect } from "../middlewares/auth.middleware";
import {
  checkoutCart,
  getAllOrdersForAdmin,
  getUserOrders,
} from "../controllers/order.controller";

const router = Router();

router.post("/checkout", protect, checkoutCart);
router.get("/history", protect, getUserOrders);

// Admin only
router.get("/all-orders", adminOnly, getAllOrdersForAdmin);
export default router;
