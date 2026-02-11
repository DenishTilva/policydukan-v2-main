import bcrypt from "bcrypt";
import { OtpToken } from "../models/common/OtpToken";
import { sendEmail } from "./email.service";
import { otpEmailTemplate } from "./otp-email.template";

export const generateAndSendOtp = async (
  userId: string,
  email: string,
  name: string,
  purpose: "login" | "register"
) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpHash = await bcrypt.hash(otp, 10);

  await OtpToken.create({
    userId,
    otpHash,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  await sendEmail({
    to: email,
    subject: "Your PolicyDukan OTP",
    html: otpEmailTemplate(otp, name),
  });
};
