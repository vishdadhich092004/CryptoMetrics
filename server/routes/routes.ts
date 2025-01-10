import express from "express";
import statRoutes from "../routes/stats.routes";
const router = express.Router();

router.use("/stats", statRoutes);

export default router;
