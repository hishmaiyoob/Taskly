import { UserRound } from "lucide-react";

export default function AdminUserTable({ users = [] }) {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center bg-[#fafaf6] rounded-2xl">
        <UserRound size={24} className="mx-auto text-[#9aa39a]" />

        <p className="mt-3 font-semibold text-[#3d473f] text-sm">
          No users found
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-t-2xl">
      <table className="w-full border-collapse min-w-162.5">
        <thead className="bg-[#f2f8f2]">
          <tr className="border-b border-[#efeee9] text-left">
            <th className="text-xs px-4 py-3.5 tracking-wider uppercase font-semibold text-[#929a92]">
              User
            </th>

            <th className="text-xs px-4 py-3.5 tracking-wider uppercase font-semibold text-[#929a92]">
              Email
            </th>

            <th className="text-xs px-4 py-3.5 tracking-wider uppercase font-semibold text-[#929a92]">
              Role
            </th>

            <th className="text-xs px-4 py-3.5 tracking-wider uppercase font-semibold text-[#929a92]">
              Joined
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-[#f1f0eb] last:border-0"
            >
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 bg-[#c9e9b5] text-xs rounded-md font-bold tect-[#52694a]">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span className="font-semibold text-sm text-[#354037]">
                    {user.name}
                  </span>
                </div>
              </td>

              <td className="px-4 py-2.5 text-sm text-[#727b73]">{user.email}</td>

              <td className="px-4 py-2.5">
                <span className="text-[11px] bg-[#eef5e9] px-3 py-1.5 rounded-full font-semibold text-[#78966a]">
                  User
                </span>
              </td>

              <td className="px-4 py-2.5 text-[#929a92] text-xs">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
