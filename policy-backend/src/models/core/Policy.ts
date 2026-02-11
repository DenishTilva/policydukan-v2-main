import mongoose, { Schema, Document } from 'mongoose';

export interface IPolicy extends Document {
    tenantId: mongoose.Types.ObjectId;
    policyNumber: string;
    customer: mongoose.Types.ObjectId;
    insurer: mongoose.Types.ObjectId;
    policyType: mongoose.Types.ObjectId;

    issueDate: Date;
    inceptionDate: Date;
    expiryDate: Date;

    vehicleDetails?: {
        registrationNumber?: string;
        rto?: mongoose.Types.ObjectId;
        vehicleType?: mongoose.Types.ObjectId;
        make?: string;
        model?: string;
        variant?: string;
        engineNumber?: string;
        chassisNumber?: string;
        manufacturingYear?: number;
    };

    premiumDetails: {
        odPremium: number;
        tpPremium: number;
        netPremium: number;
        gstAmount: number;
        grossPremium: number;
        ncbPercentage: number;
    };

    commissionDetails?: {
        payoutPercentage?: number;
        payoutAmount?: number;
        received: boolean;
    };

    generatedBy: mongoose.Types.ObjectId;
    agent?: mongoose.Types.ObjectId;
    manager?: mongoose.Types.ObjectId;

    status: 'active' | 'expired' | 'cancelled';

    extraAttributes?: Map<string, any>; // Flexible fields
    isDeleted?: boolean;
}

const PolicySchema = new Schema<IPolicy>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },

    // -- Core Identification --
    policyNumber: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },

    // -- Master Data References --
    insurer: { type: Schema.Types.ObjectId, ref: 'InsuranceCompany', required: true },
    policyType: { type: Schema.Types.ObjectId, ref: 'PolicyType', required: true },

    // -- Dates --
    issueDate: { type: Date, required: true },
    inceptionDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true, index: true },

    // -- Asset Details --
    vehicleDetails: {
        registrationNumber: { type: String, index: true },
        rto: { type: Schema.Types.ObjectId, ref: 'RTO' },
        vehicleType: { type: Schema.Types.ObjectId, ref: 'VehicleType' },
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
    generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agent: { type: Schema.Types.ObjectId, ref: 'User' },
    manager: { type: Schema.Types.ObjectId, ref: 'User' },

    // -- Status --
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },

    // -- EXTENSIBILITY --
    extraAttributes: { type: Map, of: Schema.Types.Mixed },

    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

// Indexes
PolicySchema.index({ tenantId: 1, policyNumber: 1 }, { unique: true });
PolicySchema.index({ tenantId: 1, expiryDate: 1 });
PolicySchema.index({ tenantId: 1, 'vehicleDetails.registrationNumber': 1 });

export const Policy = mongoose.model<IPolicy>('Policy', PolicySchema);
