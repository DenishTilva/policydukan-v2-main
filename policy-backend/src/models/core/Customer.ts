import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    tenantId: mongoose.Types.ObjectId;
    firstName: string;
    lastName?: string;
    email?: string;
    phone: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        pincode?: string;
    };
    panNo?: string;
    gstNo?: string;
    type: 'individual' | 'corporate';
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String, required: true, index: true },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    panNo: String,
    gstNo: String,
    type: { type: String, enum: ['individual', 'corporate'], default: 'individual' }
}, {
    timestamps: true
});

// Compound Unique Index to prevent duplicate phones within a tenant
CustomerSchema.index({ tenantId: 1, phone: 1 }, { unique: true });

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
