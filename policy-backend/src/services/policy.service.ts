import { Policy } from "../models/core/Policy";
import { Customer } from "../models/core/Customer";
import { InsuranceCompany } from "../models/master/InsuranceCompany";
import { PolicyType } from "../models/master/PolicyType";
import { VehicleType } from "../models/master/VehicleType";
import { RTO } from "../models/master/RTO";
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
  policyData: CreatePolicyInput,
) => {
  const tenantObjectId = new mongoose.Types.ObjectId(tenantId);

  // Helper to search both tenant-specific and global master data
  const tenantAwareFilter = {
    $or: [{ tenantId: tenantObjectId }, { tenantId: null }],
  };

  // Check for duplicate policy number within tenant
  const existingPolicy = await Policy.findOne({
    tenantId: tenantObjectId,
    policyNumber: policyData.policyNumber,
  });

  if (existingPolicy) {
    throw new Error(
      `Policy number ${policyData.policyNumber} already exists for this tenant`,
    );
  }

  // Look up InsuranceCompany by name (search both tenant and global)
  const insurer = await InsuranceCompany.findOne({
    ...tenantAwareFilter,
    name: policyData.insurerId, // Frontend sends company name
  });

  if (!insurer) {
    throw new Error(`Insurance company ${policyData.insurerId} not found`);
  }

  // Look up PolicyType by category (search both tenant and global)
  const policyType = await PolicyType.findOne({
    ...tenantAwareFilter,
    category: policyData.policyTypeId, // Frontend sends policy type category
  });

  if (!policyType) {
    throw new Error(`Policy type ${policyData.policyTypeId} not found`);
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
    { upsert: true, new: true, lean: false },
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
    insurer: insurer._id, // Use looked-up insurer ObjectId
    policyType: policyType._id, // Use looked-up policyType ObjectId
    issueDate: policyData.issueDate,
    inceptionDate: policyData.inceptionDate,
    expiryDate: policyData.expiryDate,
    vehicleDetails: policyData.vehicleDetails
      ? {
          registrationNumber: policyData.vehicleDetails.registrationNumber,
          rto: policyData.vehicleDetails.rtoId
            ? new mongoose.Types.ObjectId(policyData.vehicleDetails.rtoId)
            : undefined,
          vehicleType: policyData.vehicleDetails.vehicleTypeId
            ? new mongoose.Types.ObjectId(
                policyData.vehicleDetails.vehicleTypeId,
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

/**
 * Get all policies for a tenant with search and filters
 */
export const getPolicies = async (
  tenantId: string,
  options: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {},
) => {
  const tenantObjectId = new mongoose.Types.ObjectId(tenantId);
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Build search filter
  const searchFilter: any = { tenantId: tenantObjectId };

  if (options.search) {
    searchFilter.$or = [
      { policyNumber: { $regex: options.search, $options: "i" } },
      { "customer.firstName": { $regex: options.search, $options: "i" } },
      {
        "vehicleDetails.registrationNumber": {
          $regex: options.search,
          $options: "i",
        },
      },
    ];
  }

  if (options.status) {
    searchFilter.status = options.status;
  }

  // Fetch policies with populated references
  const policies = await Policy.find(searchFilter)
    .populate("insurer", "name shortCode")
    .populate("policyType", "name category")
    .populate("customer", "firstName phone email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  // Get total count for pagination
  const total = await Policy.countDocuments(searchFilter);

  return {
    policies,
    total,
  };
};

/**
 * Update a policy
 */
export const updatePolicy = async (
  tenantId: string,
  policyId: string,
  updates: {
    status?: "active" | "expired" | "pending";
    extraAttributes?: Record<string, any>;
  },
) => {
  const tenantObjectId = new mongoose.Types.ObjectId(tenantId);
  const policyObjectId = new mongoose.Types.ObjectId(policyId);

  const policy = await Policy.findOne({
    _id: policyObjectId,
    tenantId: tenantObjectId,
  });

  if (!policy) {
    throw new Error("Policy not found");
  }

  const updatedPolicy = await Policy.findByIdAndUpdate(
    policyObjectId,
    {
      $set: {
        status: updates.status || policy.status,
        extraAttributes: updates.extraAttributes || policy.extraAttributes,
        updatedAt: new Date(),
      },
    },
    { new: true },
  )
    .populate("insurer", "name shortCode")
    .populate("policyType", "name category")
    .populate("customer", "firstName phone email");

  return updatedPolicy;
};

/**
 * Delete a policy
 */
export const deletePolicy = async (tenantId: string, policyId: string) => {
  const tenantObjectId = new mongoose.Types.ObjectId(tenantId);
  const policyObjectId = new mongoose.Types.ObjectId(policyId);

  const result = await Policy.deleteOne({
    _id: policyObjectId,
    tenantId: tenantObjectId,
  });

  if (result.deletedCount === 0) {
    throw new Error("Policy not found");
  }

  return { message: "Policy deleted successfully" };
};
