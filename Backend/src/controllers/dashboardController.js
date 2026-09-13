import Task from "../models/Task.js";

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // get all tasks
    const tasks = await Task.find({
      $or: [{ creator: userId }, { assignedUser: userId }],
    });

    const totalTasks = tasks.length;

    const totdoTasks = tasks.filter((task) => task.status === "todo").length;

    const doingTasks = tasks.filter((task) => task.status === "doing").length;

    const doneTasks = tasks.filter((task) => task.status === "done").length;

    return res.status(200).json({
      stats: {
        total: totalTasks,
        todo: totdoTasks,
        doing: doingTasks,
        done: doneTasks,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};
