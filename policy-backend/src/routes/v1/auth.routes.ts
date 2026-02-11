import { Router } from "express";
import {
  register,
  requestOtp,
  verifyOtp,
} from "../../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login/request-otp", requestOtp);
router.post("/login/verify-otp", verifyOtp);

export default router;
