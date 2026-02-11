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
exports.getRTOs = exports.getVehicleTypes = exports.getPolicyTypes = exports.getInsuranceCompanies = void 0;
const InsuranceCompany_1 = require("../models/master/InsuranceCompany");
const PolicyType_1 = require("../models/master/PolicyType");
const VehicleType_1 = require("../models/master/VehicleType");
const RTO_1 = require("../models/master/RTO");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Tenant-aware filter for master data
 * Returns data scoped to user's tenant + global data
 */
const getTenantAwareFilter = (tenantId) => {
    return {
        $or: [
            { tenantId: tenantId ? new mongoose_1.default.Types.ObjectId(tenantId) : null },
            { tenantId: null },
        ],
    };
};
/**
 * Get all insurance companies for the tenant
 */
const getInsuranceCompanies = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield InsuranceCompany_1.InsuranceCompany.find(Object.assign(Object.assign({}, getTenantAwareFilter(tenantId)), { active: true }))
        .lean()
        .sort({ name: 1 });
});
exports.getInsuranceCompanies = getInsuranceCompanies;
/**
 * Get all policy types for the tenant
 */
const getPolicyTypes = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PolicyType_1.PolicyType.find(getTenantAwareFilter(tenantId))
        .lean()
        .sort({ name: 1 });
});
exports.getPolicyTypes = getPolicyTypes;
/**
 * Get all vehicle types for the tenant
 */
const getVehicleTypes = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield VehicleType_1.VehicleType.find(getTenantAwareFilter(tenantId))
        .lean()
        .sort({ name: 1 });
});
exports.getVehicleTypes = getVehicleTypes;
/**
 * Get all RTOs for the tenant
 */
const getRTOs = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield RTO_1.RTO.find(getTenantAwareFilter(tenantId))
        .lean()
        .sort({ code: 1 });
});
exports.getRTOs = getRTOs;
