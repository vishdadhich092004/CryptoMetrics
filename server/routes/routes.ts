import express from "express";
import statRoutes from "../routes/stats.routes";
import deviationRoutes from "../routes/deviation.routes";
const router = express.Router();

// stats routes
router.use("/stats", statRoutes);

// deviation routes
router.use("/deviation", deviationRoutes);

export default router;
