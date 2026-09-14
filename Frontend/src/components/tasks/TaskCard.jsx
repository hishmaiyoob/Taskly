import {
  CheckCircle2,
  Circle,
  Clock3,
  MoreHorizontal,
  UserRound,
  Trash2,
} from "lucide-react";

import { useDraggable } from "@dnd-kit/core";

import { useState } from "react";

import api from "../../services/api";

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

export default function TaskCard({
  task,
  onTaskUpdated,
  onTaskDeleted,
  isOverlay = false,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });

  const config = statusConfig[task.status] || statusConfig.todo;

  const StatusIcon = config.icon;

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleAssignToMe = async () => {
    try {
      setAssigning(true);

      const storedUser = localStorage.getItem("tasklyUser");

      if (!storedUser) {
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await api.put(`/tasks/${task._id}/assign`, {
        assignedUser: user.id,
      });

      onTaskUpdated(response.data.task);
    } catch (error) {
      console.error("Assign task error:", error);
    } finally {
      setAssigning(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/tasks/${task._id}`);

      onTaskDeleted(task._id);
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group relative rounded-2xl border border-[#e8e6df] bg-white p-4 shadow-[0_6px_20px_rgba(36,48,39,0.04)] transition ${
        isDragging
          ? "z-50 opacity-40"
          : "hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(36,48,39,0.08)]"
      } ${
        isOverlay
          ? "cursor-grabbing shadow-[0_20px_50px_rgba(36,48,39,0.18)]"
          : ""
      }`}
    >
      {/* Drag area */}
      <div {...listeners} className="cursor-grab active:cursor-grabbing">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold leading-5 text-[#303a32]">
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#929992]">
                {task.description}
              </p>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9aa19a] transition hover:bg-[#f6f6f1] hover:text-[#586158]"
            >
              <MoreHorizontal size={17} />
            </button>

            {showMenu && (
              <div
                onPointerDown={(event) => event.stopPropagation()}
                className="absolute right-0 top-9 z-30 w-40 rounded-xl border border-[#e6e4dc] bg-white p-1.5 shadow-[0_12px_35px_rgba(36,48,39,0.12)]"
              >
                {task.assignedUser ? (
                  <div className="px-3 py-2 text-xs text-[#7c847c]">
                    Already assigned
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleAssignToMe}
                    disabled={assigning}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#52694a] hover:bg-[#eef5e9]"
                  >
                    <UserRound size={14} />

                    {assigning ? "Assigning..." : "Assign to me"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#a45e52] hover:bg-[#fff3f0]"
                >
                  <Trash2 size={14} />
                  Delete task
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${config.classes}`}
          >
            <StatusIcon size={12} />
            {config.label}
          </span>

          <div className="flex min-w-0 items-center gap-1.5 text-[10px] text-[#9ba19b]">
            <UserRound size={12} />

            <span className="max-w-25 truncate">
              {task.assignedUser
                ? task.assignedBy?.role === "admin"
                  ? `${task.assignedUser.name} • by admin`
                  : task.assignedUser.name
                : "Unassigned"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
