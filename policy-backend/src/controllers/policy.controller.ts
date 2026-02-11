import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPolicy } from "../services/policy.service";

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
