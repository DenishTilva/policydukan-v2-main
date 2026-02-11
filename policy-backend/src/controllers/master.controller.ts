import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getInsuranceCompanies,
  getPolicyTypes,
  getVehicleTypes,
  getRTOs,
} from "../services/master.service";

/**
 * GET /api/v1/master/insurance-companies
 * Get all active insurance companies
 */
export const fetchInsuranceCompanies = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const tenantId = req.user?.tenantId || null;

    const companies = await getInsuranceCompanies(tenantId);

    res.json({
      success: true,
      data: companies,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch insurance companies",
    });
  }
};

/**
 * GET /api/v1/master/policy-types
 * Get all policy types
 */
export const fetchPolicyTypes = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user?.tenantId || null;

    const policyTypes = await getPolicyTypes(tenantId);

    res.json({
      success: true,
      data: policyTypes,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch policy types",
    });
  }
};

/**
 * GET /api/v1/master/vehicle-types
 * Get all vehicle types
 */
export const fetchVehicleTypes = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user?.tenantId || null;

    const vehicleTypes = await getVehicleTypes(tenantId);

    res.json({
      success: true,
      data: vehicleTypes,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch vehicle types",
    });
  }
};

/**
 * GET /api/v1/master/rtos
 * Get all RTOs (Regional Transport Offices)
 */
export const fetchRTOs = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user?.tenantId || null;

    const rtos = await getRTOs(tenantId);

    res.json({
      success: true,
      data: rtos,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch RTOs",
    });
  }
};
