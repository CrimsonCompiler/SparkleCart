import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { checkoutCart } from "../controllers/order.controller";

const router = Router();

router.post("/checkout", protect, checkoutCart);

export default router;
