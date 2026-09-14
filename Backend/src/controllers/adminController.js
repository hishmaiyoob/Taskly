import Task from "../models/Task.js";
import User from "../models/User.js";

// admin dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalTasks,
      todoTasks,
      doingTasks,
      doneTasks,
      unAssignedTasks,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Task.countDocuments(),
      Task.countDocuments({ status: "todo" }),
      Task.countDocuments({ status: "doing" }),
      Task.countDocuments({ status: "done" }),
      Task.countDocuments({ assignedUser: null }),
    ]);

    return res.status(200).json({
      stats: {
        totalUsers,
        totalTasks,
        todo: todoTasks,
        doing: doingTasks,
        done: doneTasks,
        unassigned: unAssignedTasks,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later...",
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "user",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};

// get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const { status, assignedUser } = req.query;

    const query = {};

    // filter by status
    if (status) {
      if (!["todo", "doing", "done"].includes(status)) {
        message: "Invalid task status";
      }

      query.status = status;
    }

    // filter by assigned user
    if (assignedUser) {
      query.assignedUser = assignedUser;
    }

    const tasks = await Task.find(query)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role")
      .populate("assignedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get all tasks error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};

// assign or reassign task
export const adminAssignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedUser } = req.body;

    if (!assignedUser) {
      return res.status(400).json({
        message: "Assigned user is required",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const user = await User.findById(assignedUser);

    if (!user) {
      return res.status(404).json({
        message: "Assigned user not found",
      });
    }

    // admin can only assign tasks to normal users
    if (user.role !== "user") {
      return res.status(400).json({
        message: "Tasks can only be assigned to normal users",
      });
    }

    // assign
    task.assignedUser = user._id;
    task.assignedBy = req.user._id;
    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role")
      .populate("assignedBy", "name email role");

    return res.status(200).json({
      message: "Task assigned successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Admin assign task error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};

// un assign
export const adminUnassignTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.assignedUser = null;

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role");

    return res.status(200).json({
      message: "Task unassigned successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Admin unassign task error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};
