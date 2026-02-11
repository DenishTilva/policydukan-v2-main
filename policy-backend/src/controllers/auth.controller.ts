import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { registerTenantAdmin } from "../services/auth.service";
import { requestLoginOtp } from "../services/auth.service";
import { verifyOtpAndLogin } from "../services/auth.service";
import { getCurrentUser } from "../services/auth.service";

export const register = async (req: any, res: Response) => {
  try {
    const { name, email, mobile } = req.body;

    // Validate required fields
    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and mobile are required",
      });
    }

    const result = await registerTenantAdmin({
      name,
      email,
      mobile,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully. Please login to continue.",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const requestOtp = async (req: any, res: Response) => {
  try {
    const { email } = req.body;

    const result = await requestLoginOtp(email);

    res.json({
      success: true,
      message: "OTP sent to registered email",
      ...(result && { otp: result.otp }), // Include OTP in dev mode
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtp = async (req: any, res: Response) => {
  try {
    const { email, otp } = req.body;

    const authData = await verifyOtpAndLogin(email, otp);

    res.json({
      success: true,
      data: authData,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET /api/v1/auth/me
 * Get current authenticated user
 */
export const me = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const tenantId = req.user?.tenantId || null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await getCurrentUser(userId, tenantId);

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user",
    });
  }
};
