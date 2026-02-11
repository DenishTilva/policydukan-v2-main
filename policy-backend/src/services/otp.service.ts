import bcrypt from "bcrypt";
import { OtpToken } from "../models/common/OtpToken";
import { sendEmail } from "./email.service";
import { otpEmailTemplate } from "./otp-email.template";

export const generateAndSendOtp = async (
  userId: string,
  email: string,
  name: string,
  purpose: "login" | "register",
): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpHash = await bcrypt.hash(otp, 10);

  await OtpToken.create({
    userId,
    otpHash,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  try {
    await sendEmail({
      to: email,
      subject: "Your PolicyDukan OTP",
      html: otpEmailTemplate(otp, name),
    });
  } catch (emailError: any) {
    // Log email error but don't fail the registration
    console.warn("⚠️  Email failed (dev mode):", emailError.message);
    console.warn(`📝 OTP for testing: ${otp}`);
  }

  return otp; // Return OTP for dev mode
};
