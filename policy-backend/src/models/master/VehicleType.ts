import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicleType extends Document {
    tenantId?: mongoose.Types.ObjectId;
    name: string;
    code?: string;
    createdAt: Date;
    updatedAt: Date;
}

const VehicleTypeSchema = new Schema<IVehicleType>({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', index: true },
    name: { type: String, required: true },
    code: { type: String }
}, {
    timestamps: true
});

export const VehicleType = mongoose.model<IVehicleType>('VehicleType', VehicleTypeSchema);
