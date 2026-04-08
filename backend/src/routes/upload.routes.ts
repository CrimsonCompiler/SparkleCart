import { Router } from "express";
import { upload } from "../middlewares/upload.middlware";
import { uploadImageConroller } from "../controllers/upload.controller";

const router = Router();

router.post("/single", upload.single("image"), uploadImageConroller);
export default router;
