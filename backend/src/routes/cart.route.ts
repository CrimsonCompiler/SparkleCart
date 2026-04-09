import { Router } from "express";
import { syncCart } from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/sync", protect, syncCart);

export default router;
