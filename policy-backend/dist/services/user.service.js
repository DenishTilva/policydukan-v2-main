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
exports.updateUserProfile = exports.getUserProfile = void 0;
const User_1 = require("../models/users/User");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Get user profile by ID
 */
const getUserProfile = (userId, tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        _id: userId,
        tenantId: new mongoose_1.default.Types.ObjectId(tenantId),
    }).lean();
    if (!user)
        throw new Error("User not found");
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        code: user.code,
        tenantId: user.tenantId,
    };
});
exports.getUserProfile = getUserProfile;
/**
 * Update user profile (name and mobile only)
 */
const updateUserProfile = (userId, tenantId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = {};
    if (data.name) {
        updateData.name = data.name;
    }
    const user = yield User_1.User.findOneAndUpdate({
        _id: userId,
        tenantId: new mongoose_1.default.Types.ObjectId(tenantId),
    }, updateData, { new: true, lean: true });
    if (!user)
        throw new Error("User not found");
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        code: user.code,
        tenantId: user.tenantId,
    };
});
exports.updateUserProfile = updateUserProfile;
