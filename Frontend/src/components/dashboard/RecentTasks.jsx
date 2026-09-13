import { CheckCircle2, Circle, Clock3 } from "lucide-react";

const statusConfig = {
  todo: {
    label: "To Do",
    icon: Circle,
    classes: "bg-[#fff7ec] text-[#b47743]",
  },
  doing: {
    label: "Doing",
    icon: Clock3,
    classes: "bg-[#fff1e2] text-[#b47743]",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    classes: "bg-[#eef5e9] text-[#78966a]",
  },
};

export default function RecentTasks({ tasks = [], onViewTasks }) {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="bg-white border border-[#e6e4dc] rounded-4xl p-6 shadow-[0_8px_30px_rgba(36,48,39,0.04)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#9aa39a] font-semibold uppercase tracking-[0.16em]">
            Workspace
          </p>

          <h2 className="text-xl mt-2 text-[#243027] font-bold">
            Recent tasks
          </h2>
        </div>

        <button
          className="flex items-center gap-1 text-[#78966a] text-sm font-semibold transition hover:text-[#52694a]"
          type="button"
          onClick={onViewTasks}
        >
          View all
        </button>
      </div>

      <div className="mt-6">
        {recentTasks.length > 0 ? (
          <div className="divide-y divide-[#efeee9]">
            {recentTasks.map((task) => {
              const config = statusConfig[task.status] || statusConfig.todo;

              const Icon = config.icon;

              return (
                <div
                  key={task._id}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div
                    className={`flex items-center justify-center h-10 shrink-0 w-10 rounded-xl ${config.classes}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[#303a32] truncate text-sm font-semibold">
                      {task.title}
                    </p>

                    <p className="mt-1 text-[#989f98] text-xs">
                      {task.creator?.name
                        ? `Created by ${task.creator.name}`
                        : "Task"}
                    </p>
                  </div>

                  <span
                    className={`text-[11px] hidden px-3 py-1.5 font-semibold sm:block rounded-full ${config.classes}`}
                  >
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#fafaf6] text-center rounded-2xl p-6">
            <p className="text-[#3d473f] font-semibold text-sm">No tasks yet</p>

            <p className="text-[#929992] mt-1 text-xs">
              Your recent tasks will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
