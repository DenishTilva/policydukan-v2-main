import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserProfile, updateUserProfile } from "../services/user.service";

/**
 * GET /api/v1/users/profile
 * Get current user's profile
 */
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const tenantId = req.user?.tenantId;

    if (!userId || !tenantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const profile = await getUserProfile(userId, tenantId);

    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
    });
  }
};

/**
 * PUT /api/v1/users/profile
 * Update current user's profile
 */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const tenantId = req.user?.tenantId;

    if (!userId || !tenantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { name, mobile } = req.body;

    // Validate input
    if (!name && !mobile) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name or mobile) is required",
      });
    }

    const updatedProfile = await updateUserProfile(userId, tenantId, {
      name,
      mobile,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};
