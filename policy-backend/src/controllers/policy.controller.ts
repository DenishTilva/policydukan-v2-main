import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createPolicy,
  getPolicies,
  updatePolicy,
  deletePolicy,
} from "../services/policy.service";

/**
 * POST /api/v1/policies
 * Create a new policy
 */
export const addPolicy = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const tenantId = req.user?.tenantId;

    if (!userId || !tenantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      policyNumber,
      insurerId,
      policyTypeId,
      issueDate,
      inceptionDate,
      expiryDate,
      customer,
      vehicleDetails,
      premiumDetails,
      extraAttributes,
      agentId,
      managerId,
    } = req.body;

    // Validate required fields
    if (
      !policyNumber ||
      !insurerId ||
      !policyTypeId ||
      !issueDate ||
      !inceptionDate ||
      !expiryDate ||
      !customer?.firstName ||
      !customer?.phone ||
      !premiumDetails?.netPremium ||
      !premiumDetails?.gstAmount ||
      !premiumDetails?.grossPremium
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const policyResult = await createPolicy(tenantId, userId, {
      policyNumber,
      insurerId,
      policyTypeId,
      issueDate: new Date(issueDate),
      inceptionDate: new Date(inceptionDate),
      expiryDate: new Date(expiryDate),
      customer,
      vehicleDetails,
      premiumDetails,
      extraAttributes,
      agentId,
      managerId,
    });

    res.status(201).json({
      success: true,
      message: "Policy created successfully",
      data: policyResult,
    });
  } catch (error: any) {
    // Handle duplicate policy number error
    if (error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create policy",
    });
  }
};

/**
 * GET /api/v1/policies
 * Get all policies for the tenant with pagination
 */
export const listPolicies = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Get query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const status = (req.query.status as string) || "";

    const result = await getPolicies(tenantId, {
      page,
      limit,
      search,
      status,
    });

    res.json({
      success: true,
      data: result.policies,
      pagination: {
        total: result.total,
        page,
        limit,
        pages: Math.ceil(result.total / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch policies",
    });
  }
};

/**
 * PUT /api/v1/policies/:id
 * Update a policy
 */
export const updatePolicyHandler = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user?.tenantId;
    const { id } = req.params;
    const { status, extraAttributes } = req.body;

    if (!tenantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedPolicy = await updatePolicy(tenantId, id, {
      status,
      extraAttributes,
    });

    res.json({
      success: true,
      message: "Policy updated successfully",
      data: updatedPolicy,
    });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update policy",
    });
  }
};

/**
 * DELETE /api/v1/policies/:id
 * Delete a policy
 */
export const deletePolicyHandler = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user?.tenantId;
    const { id } = req.params;

    if (!tenantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await deletePolicy(tenantId, id);

    res.json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete policy",
    });
  }
};
