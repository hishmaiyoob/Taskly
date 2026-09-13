import { CheckCircle2, CircleDashed, Clock3, ListTodo } from "lucide-react";

const iconMap = {
  total: ListTodo,
  todo: CircleDashed,
  doing: Clock3,
  done: CheckCircle2,
};

export default function StatsCard({ type, label, value, description }) {
  const Icon = iconMap[type];

  return (
    <div className="group rounded-[28px] border border-[#e6e4dc] bg-white p-5 transition shadow-[0_8px_30px_rgba(36,48,39,0.04)] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(36,48,39,0.08)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center h-11 w-11 bg-[#eef5e9] rounded-2xl text-[#78966a]">
          <Icon size={21} strockWidth={2} />
        </div>

        <span className="text-xs font-medium text-[#9aa39a]">Taskly</span>
      </div>

      <div className="mt-7">
        <p className="text-sm font-medium text-[#6f786f]">{label}</p>

        <div className="mt-1 flex gap-2 items-end">
          <h3 className="text-3xl text-[#243027] font-bold tracking-tight">
            {value}
          </h3>
        </div>

        <p className="mt-2 text-[#929a92] text-xs">{description}</p>
      </div>
    </div>
  );
}
