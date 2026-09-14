import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

export default function TaskColumn({
  column,
  tasks,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <section
      ref={setNodeRef}
      className={`min-h-125 rounded-[28px] border border-[#e6e4dc] p-4 transition ${
        column.color
      } ${isOver ? "ring-2 ring-[#b7dca3] ring-offset-2" : ""}`}
    >
      {/* Column header */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${column.dot}`} />

          <div>
            <h2 className="text-sm font-bold text-[#374039]">{column.title}</h2>

            <p className="mt-1 text-xs text-[#949b94]">{column.description}</p>
          </div>
        </div>

        <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-white/70 px-2 text-xs font-bold text-[#7d857d]">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex min-h-45 items-center justify-center rounded-2xl border border-dashed border-[#dcdad2] bg-white/40 px-5 text-center">
            <div>
              <p className="text-sm font-semibold text-[#7c847c]">
                No tasks here
              </p>

              <p className="mt-1 text-xs text-[#a1a7a1]">
                Drag a task into this column.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
