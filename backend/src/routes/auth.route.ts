import { Router } from "express";
import {
  customerLogin,
  customerRegister,
  getCustomerProfile,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", customerRegister);
router.post("/login", customerLogin);

router.get("/me", protect, getCustomerProfile);

export default router;
