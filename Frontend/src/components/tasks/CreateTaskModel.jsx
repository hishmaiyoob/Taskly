import { X, Sparkles } from "lucide-react";
import { useState } from "react";

import api from "../../services/api";

export default function CreateTaskModal({ onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/tasks", {
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");

      onCreated();
    } catch (error) {
      console.error("Create task error:", error);

      setError(error.response?.data?.message || "Unable to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#243027]/30 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-[30px] border border-white/70 bg-[#fcfbf7] shadow-[0_30px_80px_rgba(36,48,39,0.22)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e8e6df] px-6 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c9e9b5] text-[#52694a]">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#243027]">
                Create a task
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#8b938b]">
                Add something meaningful to your workspace.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#8d958d] transition hover:bg-white hover:text-[#4d574f]"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-[#3d473f]">
              Task title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to get done?"
              maxLength={150}
              autoFocus
              className="mt-2 w-full rounded-2xl border border-[#dfded6] bg-white px-4 py-3.5 text-sm text-[#303a32] outline-none transition placeholder:text-[#b0b5b0] focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="text-sm font-semibold text-[#3d473f]">
              Description
              <span className="ml-1 font-normal text-[#a1a7a1]">
                (optional)
              </span>
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add some details about this task..."
              rows={5}
              maxLength={2000}
              className="mt-2 w-full resize-none rounded-2xl border border-[#dfded6] bg-white px-4 py-3.5 text-sm leading-6 text-[#303a32] outline-none transition placeholder:text-[#b0b5b0] focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
            />
          </div>

          {/* Default status */}
          <div className="mt-5 rounded-2xl bg-[#eef5e9] px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#52694a]">
                  Starting status
                </p>

                <p className="mt-0.5 text-[11px] text-[#81907b]">
                  New tasks begin in To Do.
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#78966a]">
                To Do
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-[#efd7d1] bg-[#fff3f0] px-4 py-3 text-xs font-medium text-[#a45e52]">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-2xl border border-[#dfded6] bg-white px-5 py-3 text-sm font-semibold text-[#687168] transition hover:bg-[#f7f7f2] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-[#243027] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#334238] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
