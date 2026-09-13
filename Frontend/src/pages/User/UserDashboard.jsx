import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TodayFocus from "../../components/dashboard/TodayFocus";
import RecentTasks from "../../components/dashboard/RecentTasks";
import WorkflowPreview from "../../components/dashboard/WorkflowPreview";
import StatsCard from "../../components/dashboard/StatsCard";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    doing: 0,
    done: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("tasklyToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const storedUser = localStorage.getItem("tasklyUser");

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            localStorage.removeItem("tasklyUser");
          }
        }

        const [userResponse, dashboardResponse, tasksResponse] =
          await Promise.all([
            api.get("/users/me"),
            api.get("/dashboard/user"),
            api.get("/tasks/my"),
          ]);

        setUser(userResponse.data.user);

        setStats(dashboardResponse.data.stats);

        setTasks(tasksResponse.data.tasks);
      } catch (error) {
        console.error("Dashboard loading error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("tasklyToken");
          localStorage.removeItem("tasklyUser");

          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message || "Unable to load your dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleCreateTask = () => {
    window.dispatchEvent(new Event("taskly:open-create-task"));
  };

  const handleViewTasks = () => {
    navigate("/app/tasks");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="max-w-md rounded-3xl border border-[#eaded0] bg-[#fff7ec] p-7 text-center">
          <h2 className="text-lg font-bold text-[#4b4036]">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#82766b]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#243027] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader user={user} onCreateTask={handleCreateTask} />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <TodayFocus tasks={tasks} />

        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            type="total"
            label="Total tasks"
            value={stats.total}
            description="Tasks in your workspace"
          />

          <StatsCard
            type="todo"
            label="To do"
            value={stats.todo}
            description="Waiting to be started"
          />

          <StatsCard
            type="doing"
            label="In progress"
            value={stats.doing}
            description="Currently being worked on"
          />

          <StatsCard
            type="done"
            label="Completed"
            value={stats.done}
            description="Successfully finished"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <RecentTasks tasks={tasks} onViewTasks={handleViewTasks} />

        <WorkflowPreview tasks={tasks} onOpenBoard={handleViewTasks} />
      </div>
    </>
  );
}
