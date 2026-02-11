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
exports.createPolicy = void 0;
const Policy_1 = require("../models/core/Policy");
const Customer_1 = require("../models/core/Customer");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Create a new policy with tenant isolation
 */
const createPolicy = (tenantId, userId, policyData) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantObjectId = new mongoose_1.default.Types.ObjectId(tenantId);
    // Check for duplicate policy number within tenant
    const existingPolicy = yield Policy_1.Policy.findOne({
        tenantId: tenantObjectId,
        policyNumber: policyData.policyNumber,
    });
    if (existingPolicy) {
        throw new Error(`Policy number ${policyData.policyNumber} already exists for this tenant`);
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
        insurer: new mongoose_1.default.Types.ObjectId(policyData.insurerId),
        policyType: new mongoose_1.default.Types.ObjectId(policyData.policyTypeId),
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
