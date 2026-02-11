import { Schema, model, Types } from "mongoose";

const OtpTokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["login", "register"],
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// TTL index – auto delete expired OTPs
OtpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Prevent multiple active OTPs for same purpose
OtpTokenSchema.index({ userId: 1, purpose: 1 }, { unique: true });

export const OtpToken = model("OtpToken", OtpTokenSchema);
