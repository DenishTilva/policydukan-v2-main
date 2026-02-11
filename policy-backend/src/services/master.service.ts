import { InsuranceCompany } from "../models/master/InsuranceCompany";
import { PolicyType } from "../models/master/PolicyType";
import { VehicleType } from "../models/master/VehicleType";
import { RTO } from "../models/master/RTO";
import mongoose from "mongoose";

/**
 * Tenant-aware filter for master data
 * Returns data scoped to user's tenant + global data
 */
const getTenantAwareFilter = (tenantId: string | null) => {
  return {
    $or: [
      { tenantId: tenantId ? new mongoose.Types.ObjectId(tenantId) : null },
      { tenantId: null },
    ],
  };
};

/**
 * Get all insurance companies for the tenant
 */
export const getInsuranceCompanies = async (tenantId: string | null) => {
  return await InsuranceCompany.find({
    ...getTenantAwareFilter(tenantId),
    active: true,
  })
    .lean()
    .sort({ name: 1 });
};

/**
 * Get all policy types for the tenant
 */
export const getPolicyTypes = async (tenantId: string | null) => {
  return await PolicyType.find(getTenantAwareFilter(tenantId))
    .lean()
    .sort({ name: 1 });
};

/**
 * Get all vehicle types for the tenant
 */
export const getVehicleTypes = async (tenantId: string | null) => {
  return await VehicleType.find(getTenantAwareFilter(tenantId))
    .lean()
    .sort({ name: 1 });
};

/**
 * Get all RTOs for the tenant
 */
export const getRTOs = async (tenantId: string | null) => {
  return await RTO.find(getTenantAwareFilter(tenantId))
    .lean()
    .sort({ code: 1 });
};
