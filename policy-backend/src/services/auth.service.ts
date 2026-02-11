import { Tenant } from "../models/platform/Tenant";
import { User } from "../models/users/User";
import { generateAndSendOtp } from "./otp.service";
import bcrypt from "bcrypt";
import { OtpToken } from "../models/common/OtpToken";
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

  // Create tenant with auto-generated subdomain
  const subdomain = `tenant-${Date.now()}`;
  const tenant = await Tenant.create({
    name,
    subdomain,
    contactEmail: email,
    subscriptionStatus: "trial",
  });

  // Create user - OTP will be sent during login
  const user = await User.create({
    tenantId: tenant._id,
    name,
    email,
    mobile,
    role: "admin",
    status: "active",
    passwordHash: bcrypt.hashSync("otp-based-auth", 10), // OTP-based, dummy hash
  });

  return { userId: user._id, tenantId: tenant._id };
};

export const requestLoginOtp = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const otp = await generateAndSendOtp(
    user._id.toString(),
    user.email,
    user.name,
    "login",
  );

  // Return OTP in dev mode for testing
  if (process.env.NODE_ENV === "development") {
    return { otp };
  }
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
    userId: user._id.toString(),
    role: user.role,
    tenantId: user.tenantId ? user.tenantId.toString() : null,
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

/**
 * Get current user with tenant information
 */
export const getCurrentUser = async (
  userId: string,
  tenantId: string | null,
) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new Error("User not found");

  let tenantName = null;
  let subscriptionStatus = null;

  if (tenantId) {
    const tenant = await Tenant.findById(tenantId).lean();
    if (tenant) {
      tenantName = tenant.name;
      subscriptionStatus = tenant.subscriptionStatus;
    }
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId ? user.tenantId.toString() : null,
    tenantName,
    subscriptionStatus,
  };
};
