"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const user_service_1 = require("../services/user.service");
/**
 * GET /api/v1/users/profile
 * Get current user's profile
 */
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const tenantId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.tenantId;
        if (!userId || !tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const profile = yield (0, user_service_1.getUserProfile)(userId, tenantId);
        res.json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch profile",
        });
    }
});
exports.getProfile = getProfile;
/**
 * PUT /api/v1/users/profile
 * Update current user's profile
 */
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const tenantId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.tenantId;
        if (!userId || !tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { name, mobile } = req.body;
        // Validate input
        if (!name && !mobile) {
            return res.status(400).json({
                success: false,
                message: "At least one field (name or mobile) is required",
            });
        }
        const updatedProfile = yield (0, user_service_1.updateUserProfile)(userId, tenantId, {
            name,
            mobile,
        });
        res.json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update profile",
        });
    }
});
exports.updateProfile = updateProfile;
