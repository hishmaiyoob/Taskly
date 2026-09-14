import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Search } from "lucide-react";
import AdminUserTable from "../../components/admin/AdminUserTable";

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get("/admin/users");

        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Admin users loading error:", error);

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

        setError(error.response?.data?.message || "Unable to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [navigate]);

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue)
    );
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-[#eaded0] bg-[#fff7ec] p-7 text-center">
        <h2 className="text-lg font-bold text-[#4b4036]">
          Unable to load users
        </h2>

        <p className="mt-2 text-sm text-[#82766b]">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* header */}
      <div className="mb-8">
        <p className="text-[#78966a] text-sm font-medium">Admin workspace</p>

        <h1 className="text-3xl mt-2 text-[#243027] font-bold tracking-tight sm:text-4xl">
          Users
        </h1>

        <p className="text-[#7b837b] text-sm leading-6 mt-2">
          View all users registered in the Taskly workspace.
        </p>
      </div>

      {/* users card */}
      <section className="border border-[#e6e4dc] rounded-[30px] bg-white p-6 shadow-[0_8px_30px_rgba(36,48,39,0.04)] sm:p-7">
        <div className="flex flex-col sm:items-center sm:justify-between gap-4 sm:flex-row px-4">
          <div>
            <p className="text-[#929a92] text-xs">Total users</p>

            <p className="text-[#243027] mt-1 text-2xl font-bold">
              {users.length}
            </p>
          </div>

          <div className="relative w-full sm:w-70">
            <Search
              size={17}
              className="absolute text-[#9aa19a] top-1/2 left-3 -translate-y-1/2"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users..."
              className="w-full border border-[#dfded6] py-2 pl-10 pr-4 text-sm text-[#303a32] rounded-lg bg-[#fcfbf7] outline-none transition placeholder:text-[#b0b5b0] focus:border-[#abc997] focus:ring-4 focus:ring-[#e9f4e2]"
            />
          </div>
        </div>

        <div className="mt-7">
          <AdminUserTable users={filteredUsers} />
        </div>
      </section>
    </div>
  );
}
