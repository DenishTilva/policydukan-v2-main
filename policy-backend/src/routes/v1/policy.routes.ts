import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  addPolicy,
  listPolicies,
  updatePolicyHandler,
  deletePolicyHandler,
} from "../../controllers/policy.controller";

const router = Router();

/**
 * All routes require authentication
 */
router.get("/", authenticate, listPolicies);
router.post("/", authenticate, addPolicy);
router.put("/:id", authenticate, updatePolicyHandler);
router.delete("/:id", authenticate, deletePolicyHandler);

export default router;
