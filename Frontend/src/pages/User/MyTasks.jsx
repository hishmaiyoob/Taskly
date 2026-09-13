import { useCallback, useEffect, useState } from "react";

import api from "../../services/api";
import TaskBoard from "../../components/tasks/TaskBoard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks/my");

      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Tasks loading error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("tasklyToken");
        localStorage.removeItem("tasklyUser");

        window.location.href = "/login";
        return;
      }

      setError(error.response?.data?.message || "Unable to load your tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(loadTasks, 0);

    return () => clearTimeout(timeoutId);
  }, [loadTasks]);

  // Refresh after creating a new task
  useEffect(() => {
    const handleTaskCreated = () => {
      loadTasks();
    };

    window.addEventListener("taskly:task-created", handleTaskCreated);

    return () => {
      window.removeEventListener("taskly:task-created", handleTaskCreated);
    };
  }, [loadTasks]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskId),
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="max-w-md rounded-3xl border border-[#eaded0] bg-[#fff7ec] p-7 text-center">
          <h2 className="text-lg font-bold text-[#4b4036]">
            Unable to load tasks
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#82766b]">{error}</p>

          <button
            type="button"
            onClick={loadTasks}
            className="mt-5 rounded-xl bg-[#243027] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#78966a]">Workspace</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#243027] sm:text-4xl">
            My Tasks
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#7b837b]">
            Organize your work, keep priorities clear, and move tasks forward.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e6e4dc] bg-white px-5 py-3">
          <p className="text-xs text-[#929a92]">Total tasks</p>

          <p className="mt-1 text-2xl font-bold text-[#243027]">
            {tasks.length}
          </p>
        </div>
      </div>

      <TaskBoard
        tasks={tasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
}
