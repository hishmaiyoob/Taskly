import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import AdminStatsCard from "../../components/admin/AdminStatsCard";
import { ArrowRight, ClipboardList, UserRound } from "lucide-react";

export default function AdminOverview() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    todo: 0,
    doing: 0,
    done: 0,
    unassigned: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAdminOverview = async () => {
      try {
        const [dashboardResponse, taskResponse] = await Promise.all([
          api.get("/admin/dashboard"),
          api.get("/admin/tasks"),
        ]);

        setStats(dashboardResponse.data.stats);
        setTasks(taskResponse.data.tasks || []);
      } catch (error) {
        console.error("Admin dashboard loading error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("tasklyToken");
          localStorage.removeItem("tasklyUser");

          navigate("/login");
          return;
        }

        if (error.response?.status === 403) {
          navigate("/app/overview");
          return;
        }

        setError(
          error.response?.data?.message || "Unable to lead admin dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    loadAdminOverview();
  }, [navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="max-w-md border border-[#eaded0] rounded-3xl bg-[#fff7ec] p-7 text-center">
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

  const unassignedTasks = tasks
    .filter((task) => !task.assignedUser)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div>
      {/* header */}
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#78966a]">
          Admin workspace
        </p>

        <h1 className="text-3xl text-[#243027] font-bold tracking-tight sm:text-4xl">
          Workspace overview
        </h1>

        <p className="mt-2 text-[#7b837b] text-sm max-w-xl leading-6">
          Monitor users, tasks, and assignments across the entire Taskly
          workspace.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatsCard
          type="users"
          label="Total users"
          value={stats.totalUsers}
          description="Normal users in workspace"
        />

        <AdminStatsCard
          type="tasks"
          label="Total tasks"
          value={stats.totalTasks}
          description="All workspace tasks"
        />

        <AdminStatsCard
          type="todo"
          label="To Do"
          value={stats.todo}
          description="Tasks waiting to start"
        />

        <AdminStatsCard
          type="done"
          label="Completed"
          value={stats.done}
          description="Successfully completed"
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        {/* progress */}
        <section className="border border-[#e6e4dc] bg-white rounded-3xl p-5 shadow-[0_6px_24px_rgba(36,48,39,0.04)] sm:p-7">
          <div className="flex justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] text-[#9aa39a] font-semibold uppercase tracking-[0.16em]">
                Task distribution
              </p>

              <h2 className="mt-1 text-[#243027] text-lg font-bold">
                Workspace workload
              </h2>
            </div>

            <p className="text-xs text-[#8d958d]">
              {stats.totalTasks} total tasks
            </p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <div className="bg-[#fff7ec] rounded-2xl px-4 py-3.5">
              <p className="text-[10px] text-[#b47743] uppercase tracking-wide font-semibold">
                To Do
              </p>

              <p className="mt-1 text-2xl text-[#243027] font-bold">
                {stats.todo}
              </p>
            </div>

            <div className="bg-[#fff7ec] rounded-2xl px-4 py-3.5">
              <p className="text-[10px] text-[#b47743] uppercase tracking-wide font-semibold">
                Doing
              </p>

              <p className="mt-1 text-2xl text-[#243027] font-bold">
                {stats.doing}
              </p>
            </div>

            <div className="bg-[#fff7ec] rounded-2xl px-4 py-3.5">
              <p className="text-[10px] text-[#b47743] uppercase tracking-wide font-semibold">
                Done
              </p>

              <p className="mt-1 text-2xl text-[#243027] font-bold">
                {stats.done}
              </p>
            </div>
          </div>
        </section>

        {/* unassigned tasks */}
        <section className="border border-[#e6e4dc] bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgba(36,48,39,0.04)] sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#9aa39a]">
                Need attention
              </p>

              <h2 className="mt-1 text-[#243027] text-lg font-bold ">
                Unassigned tasks
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/tasks")}
              className="flex text-[#243027] items-center gap-1 font-semibold text-xs rounded-lg px-2 py-1.5 transition hover:text-[#52694a]"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-4">
            {unassignedTasks.length > 0 ? (
              <div className="divide-y divide-[#efeee9]">
                {unassignedTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center py-3 gap-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center justify-center w-9 h-9 shrink-0 bg-[#fff7ec] text-[#b47743] rounded-xl">
                      <ClipboardList size={15} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[#303a32] truncate text-sm font-semibold">
                        {task.title}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-[#9aa19a]">
                        Created by {task.creator?.name || "Unknown"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/admin/tasks")}
                      className="text-[11px] font-semibold bg-[#eef5e9] rounded-lg hidden sm:block px-2.5 py-1.5 text-[#52694a] transition hover:bg-[#dceece]"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#eef5e9] px-5 py-6 text-center rounded-2xl">
                <UserRound size={20} className="text-[#78966a] mx-auto" />

                <p className="mt-2 text-[#3d473f] text-sm font-semibold">
                  All tasks are assigned
                </p>

                <p className="mt-1 text-[#929a92] text-[11px]">
                  There are no tasks waiting dor assignment.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
