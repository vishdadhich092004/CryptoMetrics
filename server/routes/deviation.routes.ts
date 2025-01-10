import express from "express";
import { getDeviation } from "../controllers/deviation.controller";
const router = express.Router();

// deviation get route
router.get("/", getDeviation);

export default router;
