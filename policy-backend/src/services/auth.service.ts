import {Tenant} from "../models/platform/Tenant";
import {User} from "../models/users/User";
import { generateAndSendOtp } from "./otp.service";
import bcrypt from "bcrypt";
import {OtpToken} from "../models/common/OtpToken";
import { signJwt } from "../utils/jwt";

export const registerTenantAdmin = async ({
  name,
  email,
  mobile,
}: {
  name: string;
  email: string;
  mobile: string;
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const tenant = await Tenant.create({
    name,
    contactEmail: email,
    subscriptionStatus: "trial",
  });

  const user = await User.create({
    tenantId: tenant._id,
    name,
    email,
    mobile,
    role: "admin",
    status: "active",
  });

  await generateAndSendOtp(user._id.toString(), email, name, "register");
};

export const requestLoginOtp = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  await generateAndSendOtp(user._id.toString(), user.email, user.name, "login");
};

export const verifyOtpAndLogin = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid user");

  const otpRecord = await OtpToken.findOne({
    userId: user._id,
    purpose: "login",
  });

  if (!otpRecord) throw new Error("OTP expired or invalid");

  const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
  if (!isValid) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    throw new Error("Invalid OTP");
  }

  await OtpToken.deleteMany({ userId: user._id });

  const token = signJwt({
    userId: user._id,
    role: user.role,
    tenantId: user.tenantId || null,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      tenantId: user.tenantId,
    },
  };
};

