import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    tenantId: mongoose.Types.ObjectId;
    email: string;
    passwordHash: string;
    name: string;
    role: 'admin' | 'staff' | 'manager' | 'agent';
    code?: string;
    reportingManagerId?: mongoose.Types.ObjectId;
    status: 'active' | 'inactive';
    permissions?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'staff', 'manager', 'agent'],
        required: true
    },
    code: { type: String },
    reportingManagerId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    permissions: [{ type: String }]
}, {
    timestamps: true
});

// Compound Unique Index: Email must be unique within a Tenant
UserSchema.index({ tenantId: 1, email: 1 }, { unique: true });

export const User = mongoose.model<IUser>('User', UserSchema);
