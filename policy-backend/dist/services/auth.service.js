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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.verifyOtpAndLogin = exports.requestLoginOtp = exports.registerTenantAdmin = void 0;
const Tenant_1 = require("../models/platform/Tenant");
const User_1 = require("../models/users/User");
const otp_service_1 = require("./otp.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const OtpToken_1 = require("../models/common/OtpToken");
const jwt_1 = require("../utils/jwt");
const registerTenantAdmin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, mobile, subdomain, }) {
    const existingUser = yield User_1.User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const tenant = yield Tenant_1.Tenant.create({
        name,
        subdomain,
        contactEmail: email,
        subscriptionStatus: "trial",
    });
    const user = yield User_1.User.create({
        tenantId: tenant._id,
        name,
        email,
        role: "admin",
        status: "active",
        passwordHash: bcrypt_1.default.hashSync("otp-based-auth", 10), // OTP-based, dummy hash
    });
    const otp = yield (0, otp_service_1.generateAndSendOtp)(user._id.toString(), email, name, "register");
    // Return OTP in dev mode for testing
    if (process.env.NODE_ENV === "development") {
        return { otp };
    }
});
exports.registerTenantAdmin = registerTenantAdmin;
const requestLoginOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const otp = yield (0, otp_service_1.generateAndSendOtp)(user._id.toString(), user.email, user.name, "login");
    // Return OTP in dev mode for testing
    if (process.env.NODE_ENV === "development") {
        return { otp };
    }
});
exports.requestLoginOtp = requestLoginOtp;
const verifyOtpAndLogin = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ email });
    if (!user)
        throw new Error("Invalid user");
    const otpRecord = yield OtpToken_1.OtpToken.findOne({
        userId: user._id,
        purpose: "login",
    });
    if (!otpRecord)
        throw new Error("OTP expired or invalid");
    const isValid = yield bcrypt_1.default.compare(otp, otpRecord.otpHash);
    if (!isValid) {
        otpRecord.attempts += 1;
        yield otpRecord.save();
        throw new Error("Invalid OTP");
    }
    yield OtpToken_1.OtpToken.deleteMany({ userId: user._id });
    const token = (0, jwt_1.signJwt)({
        userId: user._id.toString(),
        role: user.role,
        tenantId: user.tenantId ? user.tenantId.toString() : null,
    });
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
            tenantId: user.tenantId,
        },
    };
});
exports.verifyOtpAndLogin = verifyOtpAndLogin;
/**
 * Get current user with tenant information
 */
const getCurrentUser = (userId, tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(userId).lean();
    if (!user)
        throw new Error("User not found");
    let tenantName = null;
    let subscriptionStatus = null;
    if (tenantId) {
        const tenant = yield Tenant_1.Tenant.findById(tenantId).lean();
        if (tenant) {
            tenantName = tenant.name;
            subscriptionStatus = tenant.subscriptionStatus;
        }
    }
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId ? user.tenantId.toString() : null,
        tenantName,
        subscriptionStatus,
    };
});
exports.getCurrentUser = getCurrentUser;
