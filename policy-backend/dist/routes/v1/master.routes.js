"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const master_controller_1 = require("../../controllers/master.controller");
const router = (0, express_1.Router)();
/**
 * All routes require authentication
 */
router.get("/insurance-companies", auth_middleware_1.authenticate, master_controller_1.fetchInsuranceCompanies);
router.get("/policy-types", auth_middleware_1.authenticate, master_controller_1.fetchPolicyTypes);
router.get("/vehicle-types", auth_middleware_1.authenticate, master_controller_1.fetchVehicleTypes);
router.get("/rtos", auth_middleware_1.authenticate, master_controller_1.fetchRTOs);
exports.default = router;
