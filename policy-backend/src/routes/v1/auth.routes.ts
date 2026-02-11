import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  register,
  requestOtp,
  verifyOtp,
  me,
} from "../../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login/request-otp", requestOtp);
router.post("/login/verify-otp", verifyOtp);
router.get("/me", authenticate, me);

export default router;
