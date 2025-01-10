import express from "express";
import { getStats } from "../controllers/stats.controller";

const router = express.Router();

// get stats routes
router.get("/", getStats);

export default router;
