import mongoose, { Schema, Document } from 'mongoose';

export interface IPolicyType extends Document {
    tenantId?: mongoose.Types.ObjectId;
    name: string;
    category?: 'motor' | 'health' | 'life' | 'non-motor';
    code?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PolicyTypeSchema = new Schema<IPolicyType>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', index: true },
    name: { type: String, required: true },
    category: { type: String, enum: ['motor', 'health', 'life', 'non-motor'] },
    code: { type: String }
}, {
    timestamps: true
});

export const PolicyType = mongoose.model<IPolicyType>('PolicyType', PolicyTypeSchema);
