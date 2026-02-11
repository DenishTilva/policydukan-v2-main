import { Router } from "express";
import authRoutes from "./auth.routes";
import masterRoutes from "./master.routes";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Master data routes
router.use("/master", masterRoutes);

export default router;
