import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { checkoutCart, getUserOrders } from "../controllers/order.controller";

const router = Router();

router.post("/checkout", protect, checkoutCart);
router.get("/history", protect, getUserOrders);
export default router;
