import { CheckCircle2, CircleDashed, ClipboardList, Users } from "lucide-react";

const iconMap = {
  users: Users,
  tasks: ClipboardList,
  todo: CircleDashed,
  done: CheckCircle2,
};

export default function AdminStatsCard({ type, label, value, description }) {
  const Icon = iconMap[type];

  return (
    <div className="group border border-[#e6e4dc] p-5 rounded-[28px] bg-white transition duration-300 shadow-[0_8px_30px_rgba(36,48,39,0.04)] hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(36,48,39,0.08)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center h-9 w-9 bg-[#eef5e9] rounded-2xl text-[#78966a]">
          <Icon size={18} strokeWidth={2} />
        </div>

        <span className="text-xs text-[#9aa39a] font-medium">Admin</span>
      </div>

      <div className="mt-4">
        <p className="text-[#6f786f] text-sm font-medium">{label}</p>

        <h3 className="mt-1 text-[#243027] text-3xl font-bold tracking-tight">
          {value}
        </h3>

        <p className="mt-2 text-[#929a92] text-xs">{description}</p>
      </div>
    </div>
  );
}
