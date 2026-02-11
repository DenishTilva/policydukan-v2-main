import { User } from "../models/users/User";
import mongoose from "mongoose";

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: string, tenantId: string) => {
  const user = await User.findOne({
    _id: userId,
    tenantId: new mongoose.Types.ObjectId(tenantId),
  }).lean();

  if (!user) throw new Error("User not found");

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    code: user.code,
    tenantId: user.tenantId,
  };
};

/**
 * Update user profile (name and mobile only)
 */
export const updateUserProfile = async (
  userId: string,
  tenantId: string,
  data: {
    name?: string;
    mobile?: string;
  },
) => {
  const updateData: any = {};

  if (data.name) {
    updateData.name = data.name;
  }

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      tenantId: new mongoose.Types.ObjectId(tenantId),
    },
    updateData,
    { new: true, lean: true },
  );

  if (!user) throw new Error("User not found");

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    code: user.code,
    tenantId: user.tenantId,
  };
};
