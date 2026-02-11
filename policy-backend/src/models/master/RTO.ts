import mongoose, { Schema, Document } from 'mongoose';

export interface IRTO extends Document {
    tenantId?: mongoose.Types.ObjectId;
    code: string;
    location: string;
    state: string;
    pincode?: string;
    createdAt: Date;
    updatedAt: Date;
}

const RTOSchema = new Schema<IRTO>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', index: true },
    code: { type: String, required: true, index: true },
    location: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String }
}, {
    timestamps: true
});

export const RTO = mongoose.model<IRTO>('RTO', RTOSchema);
