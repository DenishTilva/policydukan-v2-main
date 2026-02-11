import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { getProfile, updateProfile } from "../../controllers/user.controller";

const router = Router();

/**
 * All routes require authentication
 */
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

export default router;
