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
exports.deletePolicyHandler = exports.updatePolicyHandler = exports.listPolicies = exports.addPolicy = void 0;
const policy_service_1 = require("../services/policy.service");
/**
 * POST /api/v1/policies
 * Create a new policy
 */
const addPolicy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { policyNumber, insurerId, policyTypeId, issueDate, inceptionDate, expiryDate, customer, vehicleDetails, premiumDetails, extraAttributes, agentId, managerId, } = req.body;
        // Validate required fields
        if (!policyNumber ||
            !insurerId ||
            !policyTypeId ||
            !issueDate ||
            !inceptionDate ||
            !expiryDate ||
            !(customer === null || customer === void 0 ? void 0 : customer.firstName) ||
            !(customer === null || customer === void 0 ? void 0 : customer.phone) ||
            !(premiumDetails === null || premiumDetails === void 0 ? void 0 : premiumDetails.netPremium) ||
            !(premiumDetails === null || premiumDetails === void 0 ? void 0 : premiumDetails.gstAmount) ||
            !(premiumDetails === null || premiumDetails === void 0 ? void 0 : premiumDetails.grossPremium)) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }
        const policyResult = yield (0, policy_service_1.createPolicy)(tenantId, userId, {
            policyNumber,
            insurerId,
            policyTypeId,
            issueDate: new Date(issueDate),
            inceptionDate: new Date(inceptionDate),
            expiryDate: new Date(expiryDate),
            customer,
            vehicleDetails,
            premiumDetails,
            extraAttributes,
            agentId,
            managerId,
        });
        res.status(201).json({
            success: true,
            message: "Policy created successfully",
            data: policyResult,
        });
    }
    catch (error) {
        // Handle duplicate policy number error
        if (error.message.includes("already exists")) {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create policy",
        });
    }
});
exports.addPolicy = addPolicy;
/**
 * GET /api/v1/policies
 * Get all policies for the tenant with pagination
 */
const listPolicies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        // Get query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const status = req.query.status || "";
        const result = yield (0, policy_service_1.getPolicies)(tenantId, {
            page,
            limit,
            search,
            status,
        });
        res.json({
            success: true,
            data: result.policies,
            pagination: {
                total: result.total,
                page,
                limit,
                pages: Math.ceil(result.total / limit),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch policies",
        });
    }
});
exports.listPolicies = listPolicies;
/**
 * PUT /api/v1/policies/:id
 * Update a policy
 */
const updatePolicyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId;
        const { id } = req.params;
        const { status, extraAttributes } = req.body;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const updatedPolicy = yield (0, policy_service_1.updatePolicy)(tenantId, id, {
            status,
            extraAttributes,
        });
        res.json({
            success: true,
            message: "Policy updated successfully",
            data: updatedPolicy,
        });
    }
    catch (error) {
        if (error.message.includes("not found")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update policy",
        });
    }
});
exports.updatePolicyHandler = updatePolicyHandler;
/**
 * DELETE /api/v1/policies/:id
 * Delete a policy
 */
const deletePolicyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId;
        const { id } = req.params;
        if (!tenantId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        yield (0, policy_service_1.deletePolicy)(tenantId, id);
        res.json({
            success: true,
            message: "Policy deleted successfully",
        });
    }
    catch (error) {
        if (error.message.includes("not found")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete policy",
        });
    }
});
exports.deletePolicyHandler = deletePolicyHandler;
