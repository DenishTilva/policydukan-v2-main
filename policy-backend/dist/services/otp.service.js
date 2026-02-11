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
exports.generateAndSendOtp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const OtpToken_1 = require("../models/common/OtpToken");
const email_service_1 = require("./email.service");
const otp_email_template_1 = require("./otp-email.template");
const generateAndSendOtp = (userId, email, name, purpose) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = yield bcrypt_1.default.hash(otp, 10);
    yield OtpToken_1.OtpToken.create({
        userId,
        otpHash,
        purpose,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    try {
        yield (0, email_service_1.sendEmail)({
            to: email,
            subject: "Your PolicyDukan OTP",
            html: (0, otp_email_template_1.otpEmailTemplate)(otp, name),
        });
    }
    catch (emailError) {
        // Log email error but don't fail the registration
        console.warn("⚠️  Email failed (dev mode):", emailError.message);
        console.warn(`📝 OTP for testing: ${otp}`);
    }
    return otp; // Return OTP for dev mode
});
exports.generateAndSendOtp = generateAndSendOtp;
