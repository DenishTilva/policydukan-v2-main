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
exports.fetchRTOs = exports.fetchVehicleTypes = exports.fetchPolicyTypes = exports.fetchInsuranceCompanies = void 0;
const master_service_1 = require("../services/master.service");
/**
 * GET /api/v1/master/insurance-companies
 * Get all active insurance companies
 */
const fetchInsuranceCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId) || null;
        const companies = yield (0, master_service_1.getInsuranceCompanies)(tenantId);
        res.json({
            success: true,
            data: companies,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch insurance companies",
        });
    }
});
exports.fetchInsuranceCompanies = fetchInsuranceCompanies;
/**
 * GET /api/v1/master/policy-types
 * Get all policy types
 */
const fetchPolicyTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId) || null;
        const policyTypes = yield (0, master_service_1.getPolicyTypes)(tenantId);
        res.json({
            success: true,
            data: policyTypes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch policy types",
        });
    }
});
exports.fetchPolicyTypes = fetchPolicyTypes;
/**
 * GET /api/v1/master/vehicle-types
 * Get all vehicle types
 */
const fetchVehicleTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId) || null;
        const vehicleTypes = yield (0, master_service_1.getVehicleTypes)(tenantId);
        res.json({
            success: true,
            data: vehicleTypes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch vehicle types",
        });
    }
});
exports.fetchVehicleTypes = fetchVehicleTypes;
/**
 * GET /api/v1/master/rtos
 * Get all RTOs (Regional Transport Offices)
 */
const fetchRTOs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.tenantId) || null;
        const rtos = yield (0, master_service_1.getRTOs)(tenantId);
        res.json({
            success: true,
            data: rtos,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch RTOs",
        });
    }
});
exports.fetchRTOs = fetchRTOs;
