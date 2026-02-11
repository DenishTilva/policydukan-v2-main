import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

// Import Routes
import v1Routes from "./routes/v1";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// Routes
app.use("/api/v1", v1Routes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
