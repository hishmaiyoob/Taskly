import { ArrowRight } from "lucide-react";

export default function WorkflowPreview({ tasks = [], onOpenBoard }) {
  const columns = [
    {
      key: "todo",
      title: "To Do",
      color: "bg-[#fff7ec]",
      dot: "bg-[#d9a36f]",
    },
    {
      key: "doing",
      title: "Doing",
      color: "bg-[#fff1e2]",
      dot: "bg-[#e09a55]",
    },
    {
      key: "done",
      title: "Done",
      color: "bg-[#eef5e9]",
      dot: "bg-[#91b77e]",
    },
  ];

  return (
    <section className="border border-[#e6e4dc] rounded-4xl bg-white p-6 shadow-[0_8px_30px_rgba(36,48,39,0.04)] sm:p-7">
      <div className="flex flex-col justify-between gap-3 sm:items-center sm:flex-row">
        <div>
          <p className="text-[#9aa39a] uppercase tracking-[0.16em] font-semibold text-xs">
            Your flow
          </p>

          <h2 className="text-[#243027] mt-2 text-xl font-bold">
            Work at a glance
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenBoard}
          className="flex items-center gap-1 text-[#78966a] text-sm font-semibold"
        >
          Open board
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.key,
          );

          return (
            <div key={column.key} className={`rounded-2xl p-4 ${column.color}`}>
              <div className="flex font-stretch-ultra-condensed justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />

                  <span className="text-xs text-[#596258] font-bold">
                    {column.title}
                  </span>
                </div>

                <span className="text-xs text-[#8b938a] font-semibold">
                  {columnTasks.length}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {columnTasks.slice(0, 2).map((task) => (
                  <div
                    className="bg-white/70 p-3 border border-white/80 rounded-xl"
                    key={task._id}
                  >
                    <p className="text-[#8b938a] font-semibold truncate text-xs">
                      {task.title}
                    </p>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <p className="text-center text-[#9ba19a] py-3 text-[11px]">
                    Nothing here
                  </p>
                )}

                {columnTasks.length > 2 && (
                  <p className="pt-1 text-center text-[11px] text-[#879087] font-medium">
                    +{columnTasks.length - 2} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
