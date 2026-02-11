import { Router } from "express";
import authRoutes from "./auth.routes";
import masterRoutes from "./master.routes";
import userRoutes from "./user.routes";
import policyRoutes from "./policy.routes";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Master data routes
router.use("/master", masterRoutes);

// User routes
router.use("/users", userRoutes);

// Policy routes
router.use("/policies", policyRoutes);

export default router;
