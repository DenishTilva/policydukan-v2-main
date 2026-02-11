import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { addPolicy } from "../../controllers/policy.controller";

const router = Router();

/**
 * All routes require authentication
 */
router.post("/", authenticate, addPolicy);

export default router;
