import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import {
  adminAssignTask,
  adminUnassignTask,
  getAdminDashboard,
  getAllTasks,
  getAllUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/dashboard", getAdminDashboard);
router.get("/users", getAllUsers);
router.get("/tasks", getAllTasks);
router.put("/tasks/:id/assign", adminAssignTask);
router.put("/tasks/:id/unassign", adminUnassignTask);

export default router;
