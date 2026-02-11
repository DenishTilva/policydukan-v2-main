"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PolicySchema = new mongoose_1.Schema({
    tenantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    // -- Core Identification --
    policyNumber: { type: String, required: true },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer', required: true },
    // -- Master Data References --
    insurer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'InsuranceCompany', required: true },
    policyType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PolicyType', required: true },
    // -- Dates --
    issueDate: { type: Date, required: true },
    inceptionDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true, index: true },
    // -- Asset Details --
    vehicleDetails: {
        registrationNumber: { type: String, index: true },
        rto: { type: mongoose_1.Schema.Types.ObjectId, ref: 'RTO' },
        vehicleType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'VehicleType' },
        make: { type: String },
        model: { type: String },
        variant: { type: String },
        engineNumber: String,
        chassisNumber: String,
        manufacturingYear: Number
    },
    // -- Financials --
    premiumDetails: {
        odPremium: { type: Number, default: 0 },
        tpPremium: { type: Number, default: 0 },
        netPremium: { type: Number, required: true },
        gstAmount: { type: Number, required: true },
        grossPremium: { type: Number, required: true },
        ncbPercentage: { type: Number, default: 0 }
    },
    // -- Commission / Internal --
    commissionDetails: {
        payoutPercentage: Number,
        payoutAmount: Number,
        received: { type: Boolean, default: false }
    },
    // -- Sales Channel --
    generatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    agent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    // -- Status --
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
    // -- EXTENSIBILITY --
    extraAttributes: { type: Map, of: mongoose_1.Schema.Types.Mixed },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
// Indexes
PolicySchema.index({ tenantId: 1, policyNumber: 1 }, { unique: true });
PolicySchema.index({ tenantId: 1, expiryDate: 1 });
PolicySchema.index({ tenantId: 1, 'vehicleDetails.registrationNumber': 1 });
exports.Policy = mongoose_1.default.model('Policy', PolicySchema);
