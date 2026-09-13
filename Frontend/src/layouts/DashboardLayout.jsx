import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import CreateTaskModal from "../components/tasks/CreateTaskModel";

export default function DashboardLayout({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showCreateTask, setShowCreateTask] = useState(false);

  const isOverviewActive = location.pathname === "/app/overview";

  const isTasksActive = location.pathname.startsWith("/app/tasks");

  const handleLogout = () => {
    localStorage.removeItem("tasklyToken");
    localStorage.removeItem("tasklyUser");

    navigate("/login");
  };

  const handleTaskCreated = () => {
    setShowCreateTask(false);

    // Notify MyTasks to refresh its data
    window.dispatchEvent(new Event("taskly:task-created"));
  };

  useEffect(() => {
    const openModal = () => {
      setShowCreateTask(true);
    };

    window.addEventListener("taskly:open-create-task", openModal);

    return () => {
      window.removeEventListener("taskly:open-create-task", openModal);
    };
  }, []);

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#243027]">
      {/* sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-62.5 overflow-hidden border-r border-[#e8e6df] bg-[#f7f7f2] lg:flex lg:flex-col">
        <div className="flex h-full flex-col px-5 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c9e9b5] text-lg font-extrabold text-[#243027]">
              <Check size={21} strokeWidth={3}/>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">Taskly</h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9aa39a]">
                Workspace
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-10 space-y-2">
            {/* Overview */}
            <NavLink
              to="/app/overview"
              className={() =>
                `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isOverviewActive
                    ? "bg-[#e7f2df] text-[#52694a]"
                    : "text-[#6e766f] hover:bg-white"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Overview
            </NavLink>

            {/* My Tasks */}
            <NavLink
              to="/app/tasks"
              className={() =>
                `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isTasksActive
                    ? "bg-[#e7f2df] text-[#52694a]"
                    : "text-[#6e766f] hover:bg-white"
                }`
              }
            >
              <ListTodo size={18} />
              My Tasks
            </NavLink>

            {/* Create Task */}
            <button
              type="button"
              onClick={() => setShowCreateTask(true)}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#6e766f] transition hover:bg-white"
            >
              <Plus size={18} />
              Create Task
            </button>
          </nav>

          {/* Bottom section */}
          <div className="mt-auto">
            {/* User */}
            <div className="mb-4 rounded-2xl border border-[#e4e3db] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9e9b5] text-sm font-bold text-[#52694a]">
                  {firstLetter}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#354037]">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-[#979e97]">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings */}
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#737a73] transition hover:bg-white"
            >
              <Settings size={18} />
              Settings
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#737a73] transition hover:bg-white"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* main */}
      <main className="min-h-screen lg:ml-62.5">
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-[#e8e6df] bg-[#fcfbf7] px-5 py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9e9b5] font-bold">
              <Check size={21} strokeWidth={3}/>
            </div>

            <span className="font-bold">Taskly</span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9e9b5] text-sm font-bold">
            {firstLetter}
          </div>
        </div>

        {/* Current page */}
        <div className="mx-auto max-w-362.5 px-5 py-5 sm:px-8 lg:px-10 lg:py-6">
          <Outlet />
        </div>
      </main>

      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onCreated={handleTaskCreated}
        />
      )}
    </div>
  );
}
