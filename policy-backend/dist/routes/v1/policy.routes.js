"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const policy_controller_1 = require("../../controllers/policy.controller");
const router = (0, express_1.Router)();
/**
 * All routes require authentication
 */
router.post("/", auth_middleware_1.authenticate, policy_controller_1.addPolicy);
exports.default = router;
