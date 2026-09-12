import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/user", protect, getUserDashboard);

export default router;
