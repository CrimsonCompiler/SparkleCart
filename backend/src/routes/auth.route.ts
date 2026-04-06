import { Router } from "express";
import { customerRegister } from "../controllers/auth.controller";

const router = Router();

router.post("/register", customerRegister);

export default router;
