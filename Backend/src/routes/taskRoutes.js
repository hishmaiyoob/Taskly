import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  assignTask,
  createTask,
  deleteTask,
  getMyTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

// all task routes require login
router.use(protect);

router.post("/", createTask);
router.get("/my", getMyTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/assign", assignTask);
