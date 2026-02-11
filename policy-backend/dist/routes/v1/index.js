"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const master_routes_1 = __importDefault(require("./master.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const policy_routes_1 = __importDefault(require("./policy.routes"));
const router = (0, express_1.Router)();
// Auth routes
router.use("/auth", auth_routes_1.default);
// Master data routes
router.use("/master", master_routes_1.default);
// User routes
router.use("/users", user_routes_1.default);
// Policy routes
router.use("/policies", policy_routes_1.default);
exports.default = router;
