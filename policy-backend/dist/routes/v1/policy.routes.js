"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const policy_controller_1 = require("../../controllers/policy.controller");
const router = (0, express_1.Router)();
/**
 * All routes require authentication
 */
router.get("/", auth_middleware_1.authenticate, policy_controller_1.listPolicies);
router.post("/", auth_middleware_1.authenticate, policy_controller_1.addPolicy);
router.put("/:id", auth_middleware_1.authenticate, policy_controller_1.updatePolicyHandler);
router.delete("/:id", auth_middleware_1.authenticate, policy_controller_1.deletePolicyHandler);
exports.default = router;
