import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Search } from "lucide-react";
import AdminTaskTable from "../../components/admin/AdminTaskTable";
import AssignTaskModel from "../../components/admin/AssignTaskModel";

export default function AdminTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAdminTasks = async () => {
      try {
        const [tasksResponse, usersResponse] = await Promise.all([
          api.get("/admin/tasks"),
          api.get("/admin/users"),
        ]);

        setTasks(tasksResponse.data.tasks || []);
        setUsers(usersResponse.data.users || []);
      } catch (error) {
        console.error("Admin tasks loading error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("tasklyToken");
          localStorage.removeItem("tasklyUser");

          navigate("/login");
          return;
        }

        if (error.response?.status === 403) {
          navigate("/app/overview");
          return;
        }

        setError(error.response?.data?.message || "Unable to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadAdminTasks();
  }, [navigate]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesUser =
        userFilter === "all" ||
        (userFilter === "unassigned"
          ? !task.assignedUser
          : task.assignedUser?._id === userFilter);

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        task.title?.toLowerCase().includes(searchValue) ||
        task.description?.toLowerCase().includes(searchValue) ||
        task.creator?.name?.toLowerCase().includes(searchValue) ||
        task.assignedUser?.name?.toLowerCase().includes(searchValue);

      return matchesStatus && matchesUser && matchesSearch;
    });
  }, [tasks, statusFilter, userFilter, search]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTask) =>
      currentTask.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-[#eaded0] bg-[#fff7ec] p-7 text-center">
        <h2 className="text-lg font-bold text-[#4b4036]">
          Unable to load tasks
        </h2>

        <p className="mt-2 text-sm text-[#82766b]">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* header */}
      <div className="mb-8">
        <p className="text-sm text-[#78966a] font-medium">Admin workspace</p>

        <h1 className="text-3xl mt-2 text-[#243027] sm:text-4xl tracking-tight font-bold">
          All Tasks
        </h1>

        <p className="mt-2 text-[#7b837b] max-w-xl text-sm leading-6">
          View every task and manage assignments across the workspace
        </p>
      </div>

      {/* main card */}
      <section className="bg-white p-6 border border-[#e6e4dc] rounded-[30px] shadow-[0_8px_30px_rgba(36,48,39,0.04)] sm:p-7">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:items-center lg:flex-row lg:justify-between px-4">
            <div>
              <p className="text-xs text-[#929a92]">Showing tasks</p>

              <p className="mt-1 text-[#243027] text-2xl font-bold">
                {filteredTasks.length}
              </p>
            </div>

            {/* search */}
            <div className="relative w-full lg:w-75">
              <Search
                size={15}
                className="absolute text-[#9aa19a] top-1/2 left-3 -translate-y-1/2"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                className="border border-[#dfded6] bg-[#fcfbf7] w-full rounded-lg py-1.5 pl-10 pr-4 text-[14px] text-[#303a32] outline-none transition placeholder:text-[#b0b5b0] focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
              />
            </div>
            
            {/* filters */}
            <div className="flex flex-col lg:flex-row gap-3">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="bg-[#fcfbf7] px-4 py-1.5 border border-[#dfded6] rounded-lg text-[14px] font-medium text-[#586158] outline-none focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
              >
                <option value="all">All Statuses</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done </option>
              </select>

              <select
                value={userFilter}
                onChange={(event) => setUserFilter(event.target.value)}
                className="rounded-lg border border-[#dfded6] bg-[#fcfbf7] px-4 py-1.5 text-[14px] font-medium text-[#586158] outline-none focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
              >
                <option value="all">All users</option>

                <option value="unassigned">Unassigned</option>

                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="mt-7">
          <AdminTaskTable tasks={filteredTasks} onAssign={setSelectedTask} />
        </div>
      </section>

      {selectedTask && (
        <AssignTaskModel
          task={selectedTask}
          users={users}
          onClose={() => setSelectedTask(null)}
          onUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
}
