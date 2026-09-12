import Task from "../models/Task.js";

// create new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    // create task
    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      status: "todo",
      creator: req.user._id,
      assignedUser: null,
    });

    // return populated task
    const populatedTask = await Task.findById(task.id)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role");

    return res.status(201).json({
      message: "Task created successfully!",
      task: populatedTask,
    });
  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later...",
    });
  }
};

// get tasks for logged in user
export const getMyTasks = async (req, res) => {
  try {
    const { status } = req.query;

    const query = {
      $or: [{ creator: req.user._id }, { assignedUser: req.user._id }],
    };

    // status filter
    if (status) {
      if (!["todo", "doing", "done"].includes(status)) {
        return res.status(400).json({
          message: "Invalid task status",
        });
      }

      query.status = status;
    }

    const tasks = await Task.find({
      $or: [{ creator: req.user._id }, { assignedUser: req.user._id }],
    })
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get my tasks error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later...",
    });
  }
};

// get one task
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // user can only view their own tasks
    const isCreator = task.creator._id.toString() === req.user._id.toString();

    const isAssigned =
      task.assignedUser &&
      task.assignedUser._id.toString() === req.user._id.toString();

    // admins can view any tasks
    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAssigned && !isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to access this task",
      });
    }

    return res.status(200).json({
      task,
    });
  } catch (error) {
    console.error("Get task error", error);

    return res.status(500).json({
      message: "Server error. Please try again later...",
    });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found!",
      });
    }

    //  only creator can update the task
    if (task.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this task",
      });
    }

    // update title
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: "Task title cannot be empty",
        });
      }

      task.title = title.trim();
    }

    // update description
    if (description !== undefined) {
      task.description = description.trim();
    }

    //  update status
    if (status !== undefined) {
      if (!["todo", "doing", "done"].includes(status)) {
        return res.status(400).json({
          message: "Invalid task status",
        });
      }

      task.status = status;
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role");

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error", error);

    return res.status(500).json({
      message: "Server error. Please try again later...",
    });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // only creator can delete the task
    if (task.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Yor are not allowed to delete this task",
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error", error);

    return res.status(500).json({
      message: "Server error. Please try again later...",
    });
  }
};

// assign a task
export const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedUser } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // normal user
    if (req.user.role === "user") {
      // user can only assign tasks they created
      if (task.creator.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "You are not allowed to assign this task ",
        });
      }

      //   task must still be unassigned
      if (task.assignedUser) {
        return res.status(403).json({
          message: "This task is already assigned",
        });
      }

      //   user can only assign the task to themselves
      if (
        !assignedUser ||
        assignedUser.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "You can only assign tasks to yourself",
        });
      }

      task.assignedUser = req.user._id;
    }

    // admin
    if (req.user.role === "admin") {
      if (!assignedUser) {
        return res.status(400).json({
          message: "Assigned user is required",
        });
      }

      // check whether target user exists
      const user = await User.findById(assignedUser);

      if (!user) {
        return res.status(404).json({
          message: "Assigned user not found",
        });
      }

      //   prevent assigning tasks to another admin
      if (user.role !== "user") {
        return res.status(400).json({
          message: "Tasks can only be assigned to a normal user",
        });
      }

      task.assignedUser = user._id;
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("creator", "name email role")
      .populate("assignedUser", "name email role");

    return res.status(200).json({
      message: "Task assigned successfully",
      task: updateTask,
    });
  } catch (error) {
    console.error("Assign task error", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};
