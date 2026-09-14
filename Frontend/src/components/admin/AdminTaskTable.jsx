import { CheckCircle2, Circle, Clock3, UserRound } from "lucide-react";

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

export default function AdminTaskTable({ tasks = [], onAssign }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-[#fafaf6] text-center p-8 rounded-2xl">
        <p className="text-sm font-semibold text-[#3d473f]">No tasks found</p>

        <p className="text-[#929a92] text-xs mt-1">
          Tasks matching your filters will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-t-2xl">
      <table className="min-w-225 w-full border-collapse">
        <thead className="bg-[#f2f8f2]">
          <tr className="border-b border-[#efeee9] text-left">
            <th className="text-xs uppercase tracking-wider px-4 py-3.5 font-semibold text-[#929a92]">
              Task
            </th>

            <th className="text-xs uppercase tracking-wider px-4 py-3.5 font-semibold text-[#929a92]">
              Status
            </th>

            <th className="text-xs uppercase tracking-wider px-4 py-3.5 font-semibold text-[#929a92]">
              Creator
            </th>

            <th className="text-xs uppercase tracking-wider px-4 py-3.5 font-semibold text-[#929a92]">
              Assigned to
            </th>

            <th className="text-xs uppercase tracking-wider px-4 py-3.5 font-semibold text-[#929a92]">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            const config = statusConfig[task.status] || statusConfig.todo;

            const Icon = config.icon;

            return (
              <tr
                key={task._id}
                className="border-b border-[#f1f0eb] last:border-0"
              >
                {/* task */}
                <td className="px-4 py-2.5 max-w-70">
                  <p className="text-[#303a32] font-semibold truncate text-sm">
                    {task.title}
                  </p>

                  {task.description && (
                    <p className="mt-1 text-xs text-[#9aa19a] truncate">
                      {task.description}
                    </p>
                  )}
                </td>

                {/* status */}
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center text-[10px] rounded-lg gap-1.5 row-span-full px-2 py-1 font-semibold ${config.classes}`}
                  >
                    <Icon size={12} /> {config.label}
                  </span>
                </td>

                {/* creator */}
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-6 w-6 bg-[#f1f2ed] rounded-md font-bold text-xs text-[#6f786f]">
                      {task.creator?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#4d574f]">
                        {task.creator?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* assigned */}
                <td className="px-4 py-2.5">
                  {task.assignedUser ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center h-6 w-6 bg-[#c9e9b5] text-[#52694a] text-xs font-bold rounded-md">
                        {task.assignedUser.name?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </div>

                      <div>
                        <p className="text-[#4d574f] text-xs font-semibold">
                          {task.assignedUser.name}
                        </p>

                        <p className="text-[#9aa19a] text-[10px]">
                          {task.assignedUser.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[#b47743] text-xs font-medium">
                      <UserRound size={15} /> Unassigned
                    </div>
                  )}
                </td>

                {/* action */}
                <td className="px-4 py-2.5">
                  <button
                    type="button"
                    onClick={() => onAssign(task)}
                    disabled={task.status === "done"}
                    className={`px-3 py-1.5 text-xs text-[#52694a] rounded-lg font-sans transition ${
                      task.status === "done"
                        ? "cursor-not-allowed bg-[#f1f2ed] text-[#a1a8a1]"
                        : "bg-[#eef5e9] text-[#52694a] hover:bg-[#dceece]"
                    }`}
                  >
                    {task.assignedUser ? "Reassign" : "Assign"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
