import mongoose, { Schema, Document } from 'mongoose';

export interface IInsuranceCompany extends Document {
    tenantId?: mongoose.Types.ObjectId;
    name: string;
    code?: string;
    logoUrl?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const InsuranceCompanySchema = new Schema<IInsuranceCompany>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', index: true },
    name: { type: String, required: true },
    code: { type: String, index: true },
    logoUrl: { type: String },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const InsuranceCompany = mongoose.model<IInsuranceCompany>('InsuranceCompany', InsuranceCompanySchema);
