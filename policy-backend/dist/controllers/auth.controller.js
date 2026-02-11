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
exports.me = exports.verifyOtp = exports.requestOtp = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_service_2 = require("../services/auth.service");
const auth_service_3 = require("../services/auth.service");
const auth_service_4 = require("../services/auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, mobile, subdomain } = req.body;
        const result = yield (0, auth_service_1.registerTenantAdmin)({ name, email, mobile, subdomain });
        res.status(201).json(Object.assign({ success: true, message: "OTP sent to registered email" }, (result && { otp: result.otp })));
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.register = register;
const requestOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const result = yield (0, auth_service_2.requestLoginOtp)(email);
        res.json(Object.assign({ success: true, message: "OTP sent to registered email" }, (result && { otp: result.otp })));
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.requestOtp = requestOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const authData = yield (0, auth_service_3.verifyOtpAndLogin)(email, otp);
        res.json({
            success: true,
            data: authData,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
});
exports.verifyOtp = verifyOtp;
/**
 * GET /api/v1/auth/me
 * Get current authenticated user
 */
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const tenantId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.tenantId) || null;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = yield (0, auth_service_4.getCurrentUser)(userId, tenantId);
        res.json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch user",
        });
    }
});
exports.me = me;
