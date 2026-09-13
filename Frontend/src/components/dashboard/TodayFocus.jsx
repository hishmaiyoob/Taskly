import { Sparkles } from "lucide-react";

export default function TodayFocus({ tasks = [] }) {
  const activeTasks = tasks.filter((task) => task.status !== "done");

  return (
    <section className="relative bg-[#c9e9b5] overflow-hidden rounded-4xl p-6 sm:p-8 ">
      {/* decors */}
      <div className="absolute border-22 border-[#b7dca3] rounded-full -right-10 -top-10 h-40 w-40 opacity-70 " />
      <div className="absolue bg-[#d9efca] rounded-full h-32 w-32 -bottom-16 right-24 opacity-70" />

      <div className="relative">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-white/70 text-[#78966a] h-9 w-9 rounded-xl">
                <Sparkles size={18} />
              </div>

              <span className="text-sm text-[#52664c] font-semibold">
                Today's focus
              </span>
            </div>

            <h2 className="mt-5 text-2xl max-w-md font-bold text-[#243027] sm:text-3xl leading-tight">
              Make progress on what matters.
            </h2>

            <p className="mt-3 text-sm text-[#60715a] max-w-md leading-6">
              You have {activeTasks.length} active{" "}
              {activeTasks.length === 1 ? "task" : "tasks"}. Keep moving one
              card at a time.
            </p>
          </div>

          <div className="flex h-fit bg-white/60 items-center rounded-2xl gap-2 px-4 py-3 backdrop-blur-sm">
            <span className="text-2xl text-[#243027] font-bold">
              {activeTasks.length}
            </span>

            <span className="text-xs leading-4 text-[#65725f]">
              active <br /> tasks
            </span>
          </div>
        </div>

   
      </div>
    </section>
  );
}
