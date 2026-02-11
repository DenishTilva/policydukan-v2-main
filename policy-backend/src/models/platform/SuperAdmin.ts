import mongoose, { Schema, Document } from 'mongoose';

export interface ISuperAdmin extends Document {
    email: string;
    passwordHash: string;
    name?: string;
    role: string;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SuperAdminSchema = new Schema<ISuperAdmin>({
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: 'superadmin' },
    lastLogin: { type: Date }
}, {
    timestamps: true
});

export const SuperAdmin = mongoose.model<ISuperAdmin>('SuperAdmin', SuperAdminSchema);
