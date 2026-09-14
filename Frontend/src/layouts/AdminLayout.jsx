import {
  Check,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "A";

  const isOverviewActive = location.pathname.startsWith("/admin/overview");
  const isTasksActive = location.pathname.startsWith("/admin/tasks");
  const isUsersActive = location.pathname.startsWith("/admin/users");

  const handleLogout = () => {
    localStorage.removeItem("tasklyToken");
    localStorage.removeItem("tasklyUser");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#243027]">
      {/* desktop sidebar */}
      <aside className="fixed h-screen w-62.5 left-0 top-0 z-40 lg:flex lg:flex-col hidden overflow-hidden border-r border-[#e8e6df] bg-[#f7f7f2]">
        <div className="flex flex-col h-full px-5 py-6">
          {/* logo */}
          <div className="flex items-center gap-3 px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c9e9b5] text-lg font-extrabold text-[#243027]">
              <Check size={21} strokeWidth={3} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">Taskly</h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9aa39a]">
                Admin Workspace
              </p>
            </div>
          </div>

          {/* nav */}
          <nav className="mt-10 space-y-2">
            <NavLink
              to="/admin/overview"
              className={() =>
                `flex items-center w-full px-4 py-3 text-sm gap-3 font-semibold transition rounded-2xl ${isOverviewActive ? "bg-[#e7f2df] text-[#52694a]" : "text-[#6e766f] hover:bg-white"}`
              }
            >
              <LayoutDashboard size={18} /> Overview
            </NavLink>

            <NavLink
              to="/admin/tasks"
              className={() =>
                `flex items-center w-full px-4 py-3 text-sm gap-3 font-semibold transition rounded-2xl ${isTasksActive ? "bg-[#e7f2df] text-[#52694a]" : "text-[#6e766f] hover:bg-white"}`
              }
            >
              <ListTodo size={18} /> All Tasks
            </NavLink>

            <NavLink
              to="/admin/users"
              className={() =>
                `flex items-center w-full px-4 py-3 text-sm gap-3 font-semibold transition rounded-2xl ${isUsersActive ? "bg-[#e7f2df] text-[#52694a]" : "text-[#6e766f] hover:bg-white"}`
              }
            >
              <Users size={18} /> Users
            </NavLink>
          </nav>

          {/* bottom */}
          <div className="mt-auto">
            {/* admin profile */}
            <div className="mb-4 border border-[#e4e3db] bg-white p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0 w-10 h-10 bg-[#c9e9b5] text-[#52694a] rounded-xl text-sm font-bold">
                  {firstLetter}
                </div>

                <div className="min-w-0">
                  <p className="text-sm truncate font-semibold text-[#354037]">
                    {user?.name || "Administrator"}
                  </p>

                  <p className="text-xs truncate text-[#979e97]">
                    {user?.email}
                  </p>

                  <p className="mt-1 uppercase text-[10px] tracking-wider font-semibold text-[#78966a] ">
                    Administrator
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-3 px-4 w-full py-3 text-[#737a73] rounded-2xl text-sm font-medium transition hover:bg-white"
            >
              <Settings size={18} /> Settings
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex items-center gap-3 px-4 w-full py-3 text-[#737a73] rounded-2xl text-sm font-medium transition hover:bg-white"
            >
              <LogOut size={18} /> Log out
            </button>
          </div>
        </div>
      </aside>

      {/* mobile header */}
      <div className="flex items-center justify-between border-b border-[#e8e6df] bg-[#fcfbf7] px-5 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9e9b5] font-bold">
            <Check size={21} strokeWidth={3} />
          </div>

          <div>
            <span className="font-bold"> Taskly </span>

            <p className="text-[9px] uppercase tracking-wider text-[#9aa39a]">
              Admin
            </p>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9e9b5] text-sm font-bold">
          {firstLetter}
        </div>
      </div>

      {/* main */}
      <main className="min-h-screen lg:ml-62.5">
        <div className="mx-auto max-w-362.5 px-5 py-5 sm:px-8 lg:px-10 lg:py-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
