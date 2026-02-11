import { Request, Response } from "express";
import { registerTenantAdmin } from "../services/auth.service";
import { requestLoginOtp } from "../services/auth.service";
import { verifyOtpAndLogin } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile } = req.body;

    await registerTenantAdmin({ name, email, mobile });

    res.status(201).json({
      success: true,
      message: "OTP sent to registered email",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await requestLoginOtp(email);

    res.json({
      success: true,
      message: "OTP sent to registered email",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
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
