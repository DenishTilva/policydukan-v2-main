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
exports.deletePolicy = exports.updatePolicy = exports.getPolicies = exports.createPolicy = void 0;
const Policy_1 = require("../models/core/Policy");
const Customer_1 = require("../models/core/Customer");
const InsuranceCompany_1 = require("../models/master/InsuranceCompany");
const PolicyType_1 = require("../models/master/PolicyType");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Create a new policy with tenant isolation
 */
const createPolicy = (tenantId, userId, policyData) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantObjectId = new mongoose_1.default.Types.ObjectId(tenantId);
    // Helper to search both tenant-specific and global master data
    const tenantAwareFilter = {
        $or: [{ tenantId: tenantObjectId }, { tenantId: null }],
    };
    // Check for duplicate policy number within tenant
    const existingPolicy = yield Policy_1.Policy.findOne({
        tenantId: tenantObjectId,
        policyNumber: policyData.policyNumber,
    });
    if (existingPolicy) {
        throw new Error(`Policy number ${policyData.policyNumber} already exists for this tenant`);
    }
    // Look up InsuranceCompany by name (search both tenant and global)
    const insurer = yield InsuranceCompany_1.InsuranceCompany.findOne(Object.assign(Object.assign({}, tenantAwareFilter), { name: policyData.insurerId }));
    if (!insurer) {
        throw new Error(`Insurance company ${policyData.insurerId} not found`);
    }
    // Look up PolicyType by category (search both tenant and global)
    const policyType = yield PolicyType_1.PolicyType.findOne(Object.assign(Object.assign({}, tenantAwareFilter), { category: policyData.policyTypeId }));
    if (!policyType) {
        throw new Error(`Policy type ${policyData.policyTypeId} not found`);
    }
    // Upsert customer by tenantId + phone
    let customer = yield Customer_1.Customer.findOneAndUpdate({
        tenantId: tenantObjectId,
        phone: policyData.customer.phone,
    }, {
        $set: {
            firstName: policyData.customer.firstName,
            lastName: policyData.customer.lastName,
            email: policyData.customer.email,
            address: policyData.customer.address,
            type: "individual",
        },
    }, { upsert: true, new: true, lean: false });
    // Determine policy status based on expiry date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(policyData.expiryDate);
    expiryDate.setHours(0, 0, 0, 0);
    const status = expiryDate < today ? "expired" : "active";
    // Create policy
    const policy = yield Policy_1.Policy.create({
        tenantId: tenantObjectId,
        policyNumber: policyData.policyNumber,
        customer: customer._id,
        insurer: insurer._id, // Use looked-up insurer ObjectId
        policyType: policyType._id, // Use looked-up policyType ObjectId
        issueDate: policyData.issueDate,
        inceptionDate: policyData.inceptionDate,
        expiryDate: policyData.expiryDate,
        vehicleDetails: policyData.vehicleDetails
            ? {
                registrationNumber: policyData.vehicleDetails.registrationNumber,
                rto: policyData.vehicleDetails.rtoId
                    ? new mongoose_1.default.Types.ObjectId(policyData.vehicleDetails.rtoId)
                    : undefined,
                vehicleType: policyData.vehicleDetails.vehicleTypeId
                    ? new mongoose_1.default.Types.ObjectId(policyData.vehicleDetails.vehicleTypeId)
                    : undefined,
                make: policyData.vehicleDetails.make,
                model: policyData.vehicleDetails.model,
                variant: policyData.vehicleDetails.variant,
                manufacturingYear: policyData.vehicleDetails.manufacturingYear,
            }
            : undefined,
        premiumDetails: {
            netPremium: policyData.premiumDetails.netPremium,
            gstAmount: policyData.premiumDetails.gstAmount,
            grossPremium: policyData.premiumDetails.grossPremium,
            odPremium: 0,
            tpPremium: 0,
            ncbPercentage: 0,
        },
        generatedBy: new mongoose_1.default.Types.ObjectId(userId),
        agent: policyData.agentId
            ? new mongoose_1.default.Types.ObjectId(policyData.agentId)
            : undefined,
        manager: policyData.managerId
            ? new mongoose_1.default.Types.ObjectId(policyData.managerId)
            : undefined,
        status,
        extraAttributes: policyData.extraAttributes,
    });
    return {
        id: policy._id,
        policyNumber: policy.policyNumber,
        status: policy.status,
        tenantId: policy.tenantId,
    };
});
exports.createPolicy = createPolicy;
/**
 * Get all policies for a tenant with search and filters
 */
const getPolicies = (tenantId_1, ...args_1) => __awaiter(void 0, [tenantId_1, ...args_1], void 0, function* (tenantId, options = {}) {
    const tenantObjectId = new mongoose_1.default.Types.ObjectId(tenantId);
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    // Build search filter
    const searchFilter = { tenantId: tenantObjectId };
    if (options.search) {
        searchFilter.$or = [
            { policyNumber: { $regex: options.search, $options: "i" } },
            { "customer.firstName": { $regex: options.search, $options: "i" } },
            {
                "vehicleDetails.registrationNumber": {
                    $regex: options.search,
                    $options: "i",
                },
            },
        ];
    }
    if (options.status) {
        searchFilter.status = options.status;
    }
    // Fetch policies with populated references
    const policies = yield Policy_1.Policy.find(searchFilter)
        .populate("insurer", "name shortCode")
        .populate("policyType", "name category")
        .populate("customer", "firstName phone email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();
    // Get total count for pagination
    const total = yield Policy_1.Policy.countDocuments(searchFilter);
    return {
        policies,
        total,
    };
});
exports.getPolicies = getPolicies;
/**
 * Update a policy
 */
const updatePolicy = (tenantId, policyId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantObjectId = new mongoose_1.default.Types.ObjectId(tenantId);
    const policyObjectId = new mongoose_1.default.Types.ObjectId(policyId);
    const policy = yield Policy_1.Policy.findOne({
        _id: policyObjectId,
        tenantId: tenantObjectId,
    });
    if (!policy) {
        throw new Error('Policy not found');
    }
    const updatedPolicy = yield Policy_1.Policy.findByIdAndUpdate(policyObjectId, {
        $set: {
            status: updates.status || policy.status,
            extraAttributes: updates.extraAttributes || policy.extraAttributes,
            updatedAt: new Date(),
        },
    }, { new: true })
        .populate('insurer', 'name shortCode')
        .populate('policyType', 'name category')
        .populate('customer', 'firstName phone email');
    return updatedPolicy;
});
exports.updatePolicy = updatePolicy;
/**
 * Delete a policy
 */
const deletePolicy = (tenantId, policyId) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantObjectId = new mongoose_1.default.Types.ObjectId(tenantId);
    const policyObjectId = new mongoose_1.default.Types.ObjectId(policyId);
    const result = yield Policy_1.Policy.deleteOne({
        _id: policyObjectId,
        tenantId: tenantObjectId,
    });
    if (result.deletedCount === 0) {
        throw new Error('Policy not found');
    }
    return { message: 'Policy deleted successfully' };
});
exports.deletePolicy = deletePolicy;
