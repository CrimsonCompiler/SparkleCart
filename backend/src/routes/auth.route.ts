import { Router } from "express";
import {
  customerLogin,
  customerRegister,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", customerRegister);
router.post("/login", customerLogin);

export default router;
