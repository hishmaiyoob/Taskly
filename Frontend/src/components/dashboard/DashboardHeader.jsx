import { Bell, Plus } from "lucide-react";

export default function DashboardHeader({ user, onCreateTask }) {
  const firstName = user?.name || "there";

  const hour = new Date().getHours();

  let greeting = "Good morning";

  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18) {
    greeting = "Good evening";
  }

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-6 lg:justify-between lg:items-end lg:flex-row">
        <div>
          <p className="mb-2 text-[#78966a] text-sm font-medium">
            Your workspace
          </p>

          <h1 className="text-3xl text-[#243027] font-bold tracking-tight sm:text-4xl">
            {greeting}, {firstName}
            <span></span>
          </h1>

          <p className="mt-2 text-[#7b837b] text-sm max-w-xl leading-6">
            Keep the momentum going. Here's quick look at what's heppening with
            your work.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center h-11 w-11 border border-[#e6e4dc] rounded-2xl bg-white text-[#687168] transition hover:bg-[#f7f7f2]"
          >
            <Bell size={19} />
          </button>

          <button
            className="flex items-center gap-2 bg-[#243027] rounded-2xl text-sm px-5 py-3 text-white font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-[#334238]"
            type="button"
            onClick={onCreateTask}
          >
            <Plus size={18} New Task />
          </button>
        </div>
      </div>
    </header>
  );
}
