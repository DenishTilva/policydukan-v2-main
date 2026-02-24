import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";
import { seedMasterData } from "./scripts/seed-master-data";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Seed master data if not already present
  await seedMasterData();

  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  });
};

startServer();
