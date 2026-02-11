import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
    name: string;
    subdomain: string;
    contactEmail: string;
    contactPhone?: string;
    subscriptionStatus: 'active' | 'trial' | 'expired' | 'suspended';
    planId?: mongoose.Types.ObjectId;
    config?: {
        logoUrl?: string;
        themeColor?: string;
        currency: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>({
    name: { type: String, required: true },
    subdomain: { type: String, required: true, unique: true, index: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'trial', 'expired', 'suspended'],
        default: 'trial'
    },
    planId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    config: {
        logoUrl: String,
        themeColor: String,
        currency: { type: String, default: 'INR' }
    }
}, {
    timestamps: true
});

export const Tenant = mongoose.model<ITenant>('Tenant', TenantSchema);
