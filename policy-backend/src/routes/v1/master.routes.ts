import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  fetchInsuranceCompanies,
  fetchPolicyTypes,
  fetchVehicleTypes,
  fetchRTOs,
} from "../../controllers/master.controller";

const router = Router();

/**
 * All routes require authentication
 */

router.get("/insurance-companies", authenticate, fetchInsuranceCompanies);
router.get("/policy-types", authenticate, fetchPolicyTypes);
router.get("/vehicle-types", authenticate, fetchVehicleTypes);
router.get("/rtos", authenticate, fetchRTOs);

export default router;
