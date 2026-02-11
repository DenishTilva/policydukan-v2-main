import { Policy } from "../models/core/Policy";
import { Customer } from "../models/core/Customer";
import mongoose from "mongoose";

interface VehicleDetails {
  registrationNumber?: string;
  rtoId?: string;
  vehicleTypeId?: string;
  make?: string;
  model?: string;
  variant?: string;
  manufacturingYear?: number;
}

interface PremiumDetails {
  netPremium: number;
  gstAmount: number;
  grossPremium: number;
}

interface CustomerData {
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

interface CreatePolicyInput {
  policyNumber: string;
  insurerId: string;
  policyTypeId: string;
  issueDate: Date;
  inceptionDate: Date;
  expiryDate: Date;
  customer: CustomerData;
  vehicleDetails?: VehicleDetails;
  premiumDetails: PremiumDetails;
  extraAttributes?: Record<string, any>;
  agentId?: string;
  managerId?: string;
}

/**
 * Create a new policy with tenant isolation
 */
export const createPolicy = async (
  tenantId: string,
  userId: string,
  policyData: CreatePolicyInput
) => {
  const tenantObjectId = new mongoose.Types.ObjectId(tenantId);

  // Check for duplicate policy number within tenant
  const existingPolicy = await Policy.findOne({
    tenantId: tenantObjectId,
    policyNumber: policyData.policyNumber,
  });

  if (existingPolicy) {
    throw new Error(
      `Policy number ${policyData.policyNumber} already exists for this tenant`
    );
  }

  // Upsert customer by tenantId + phone
  let customer = await Customer.findOneAndUpdate(
    {
      tenantId: tenantObjectId,
      phone: policyData.customer.phone,
    },
    {
      $set: {
        firstName: policyData.customer.firstName,
        lastName: policyData.customer.lastName,
        email: policyData.customer.email,
        address: policyData.customer.address,
        type: "individual",
      },
    },
    { upsert: true, new: true, lean: false }
  );

  // Determine policy status based on expiry date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiryDate = new Date(policyData.expiryDate);
  expiryDate.setHours(0, 0, 0, 0);

  const status = expiryDate < today ? "expired" : "active";

  // Create policy
  const policy = await Policy.create({
    tenantId: tenantObjectId,
    policyNumber: policyData.policyNumber,
    customer: customer._id,
    insurer: new mongoose.Types.ObjectId(policyData.insurerId),
    policyType: new mongoose.Types.ObjectId(policyData.policyTypeId),
    issueDate: policyData.issueDate,
    inceptionDate: policyData.inceptionDate,
    expiryDate: policyData.expiryDate,
    vehicleDetails: policyData.vehicleDetails
      ? {
          registrationNumber:
            policyData.vehicleDetails.registrationNumber,
          rto: policyData.vehicleDetails.rtoId
            ? new mongoose.Types.ObjectId(policyData.vehicleDetails.rtoId)
            : undefined,
          vehicleType: policyData.vehicleDetails.vehicleTypeId
            ? new mongoose.Types.ObjectId(
                policyData.vehicleDetails.vehicleTypeId
              )
            : undefined,
          make: policyData.vehicleDetails.make,
          model: policyData.vehicleDetails.model,
          variant: policyData.vehicleDetails.variant,
          manufacturingYear: policyData.vehicleDetails.manufacturingYear,
        }
      : undefined,
    premiumDetails: {
      netPremium: policyData.premiumDetails.netPremium,
      gstAmount: policyData.premiumDetails.gstAmount,
      grossPremium: policyData.premiumDetails.grossPremium,
      odPremium: 0,
      tpPremium: 0,
      ncbPercentage: 0,
    },
    generatedBy: new mongoose.Types.ObjectId(userId),
    agent: policyData.agentId
      ? new mongoose.Types.ObjectId(policyData.agentId)
      : undefined,
    manager: policyData.managerId
      ? new mongoose.Types.ObjectId(policyData.managerId)
      : undefined,
    status,
    extraAttributes: policyData.extraAttributes,
  });

  return {
    id: policy._id,
    policyNumber: policy.policyNumber,
    status: policy.status,
    tenantId: policy.tenantId,
  };
};
