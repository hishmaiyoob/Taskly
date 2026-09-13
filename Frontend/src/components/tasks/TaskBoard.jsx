import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useState } from "react";

import api from "../../services/api";

import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";

const columns = [
  {
    id: "todo",
    title: "To Do",
    description: "Tasks waiting to start",
    color: "bg-[#fff7ec]",
    dot: "bg-[#d9a36f]",
  },
  {
    id: "doing",
    title: "Doing",
    description: "Currently in progress",
    color: "bg-[#fff1e2]",
    dot: "bg-[#e09a55]",
  },
  {
    id: "done",
    title: "Done",
    description: "Completed work",
    color: "bg-[#eef5e9]",
    dot: "bg-[#91b77e]",
  },
];

export default function TaskBoard({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event) => {
    const task = tasks.find((item) => item._id === event.active.id);

    setActiveTask(task || null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const handleDragEnd = async (event) => {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = active.id;

    const currentTask = tasks.find((task) => task._id === taskId);

    if (!currentTask) {
      return;
    }

    const newStatus = over.id;

    if (!["todo", "doing", "done"].includes(newStatus)) {
      return;
    }

    if (currentTask.status === newStatus) {
      return;
    }

    try {
      const response = await api.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      onTaskUpdated(response.data.task);
    } catch (error) {
      console.error("Task status update error:", error);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-5 xl:grid-cols-3">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 opacity-90">
            <TaskCard task={activeTask} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
