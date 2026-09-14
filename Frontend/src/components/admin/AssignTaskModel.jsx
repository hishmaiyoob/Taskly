import { useState } from "react";
import api from "../../services/api";
import { UserRound, X } from "lucide-react";

export default function AssignTaskModel({ task, users, onClose, onUpdated }) {
  const [selectedUser, setSelectedUser] = useState(
    () => task?.assignedUser?._id || "",
  );
  const [loading, setLoading] = useState(false);
  const [unassigning, setUnassigning] = useState(false);
  const [error, setError] = useState("");

  if (!task) {
    return null;
  }

  const isReassigning = Boolean(task.assignedUser);

  const handleAssign = async (event) => {
    event.preventDefault();

    if (!selectedUser) {
      setError("Please select a user...");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.put(`/admin/tasks/${task._id}/assign`, {
        assignedUser: selectedUser,
      });

      onUpdated(response.data.task);
      onClose();
    } catch (error) {
      console.error("Admin assignment error:", error);

      setError(error.response?.data?.message || "Unable to assign task.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to unassign this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setUnassigning(true);
      setError("");

      const response = await api.put(`/admin/tasks/${task._id}/unassign`);

      onUpdated(response.data.task);
      onClose();
    } catch (error) {
      console.error("Admin unassignment error:", error);

      setError(error.response?.data?.message || "Unable to unassign task.");
    } finally {
      setUnassigning(false);
    }
  };

  return (
    <div
      className="fixed items-center justify-center flex inset-0 z-50 bg-[#243027]/30 backdrop-blur-md p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="border border-white/70 w-full max-w-lg overflow-hidden rounded-[26px] bg-[#fcfbf7] shadow-[0_30px_80px_rgba(36,48,39,0.22)]">
        {/* header */}
        <div className="flex items-start justify-between border-b border-[#e8e6df] py-4 px-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-11 h-11 bg-[#c9e9b5] text-[#52694a] rounded-2xl">
              <UserRound size={18} />
            </div>

            <div>
              <h2 className="text-[#243027] text-lg font-bold">
                {isReassigning ? "Teassign task" : "Assign task"}
              </h2>

              <p className="mt-0.5 text-[#8b938b] text-xs leading-5">
                Choose a user for this task.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 text-[#8d958d] rounded-xl transition hover:bg-white hover:text-[#4d574f]"
          >
            <X size={18} />
          </button>
        </div>

        {/* body */}
        <form onSubmit={handleAssign} className="px-5 py-5 sm:p-6">
          {/* task */}
          <div className="border border-[#e6e4dc] rounded-xl p-3.5 bg-white">
            <p className="text-[#9aa39a] uppercase text-xs font-semibold tracking-wider">
              Task
            </p>

            <p className="text-[#303a32] mt-1.5 font-bold text-sm ">
              {task.title}
            </p>

            <p className="text-xs text-[#929a92] mt-0.5">
              Created by {task.creator?.name || "Unknown"}
            </p>
          </div>

          {/* current assignment */}
          {isReassigning && (
            <div className="mt-3 bg-[#fff7ec] p-3.5 rounded-xl">
              <p className="text-[#b47743] font-semibold text-xs">
                Currently assigned to
              </p>

              <p className="mt-0.5 text-[#4b4036] font-semibold text-sm">
                {task.assignedUser?.name}
              </p>

              <p className="mt-0.5 text-[#8d8176] text-xs">
                {task.assignedUser?.email}
              </p>
            </div>
          )}

          {/* select */}
          <div className="mt-4">
            <label className="text-[#3d473f] font-semibold text-sm">
              {isReassigning ? "Assign to another user" : "Assign to"}
            </label>

            <select
              value={selectedUser}
              onChange={(event) => setSelectedUser(event.target.value)}
              className="mt-1.5 border border-[#dfded6] w-full rounded-xl py-3 px-3.5 bg-white text-[#303a32] text-sm outline-none transition focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option value={user._id} key={user._id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mt-3 rounded-xl border border-[#efd7d1] bg-[#fff3f0] px-3.5 py-2.5 text-xs font-medium text-[#a45e52]">
              {error}
            </div>
          )}

          {/* buttons */}
          <div className="flex flex-col-reverse mt-5 sm:flex-row sm:justify-between gap-3">
            <div>
              {isReassigning && (
                <button
                  type="button"
                  onClick={handleUnassign}
                  disabled={loading || unassigning}
                  className="text-[#a45e52] text-sm font-semibold px-3 py-2.5 rounded-2xl transition hover:bg-[#fff3f0] disabled:opacity-50"
                >
                  {unassigning ? "Unassigning" : "Unassign task"}
                </button>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={onClose}
                disabled={loading || unassigning}
                className="border border-[#dfded6] bg-white rounded-xl px-4 py-2.5 text-[#687168] text-sm font-semibold transition hover:bg-[#f7f7f2] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                className="bg-[#243027] px-4 py-2.5 rounded-xl font-semibold text-sm text-white hover:bg-[#334238] shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading || unassigning || !selectedUser}
                type="submit"
              >
                {loading
                  ? "Saving"
                  : isReassigning
                    ? "Reassign task"
                    : "Assign task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
