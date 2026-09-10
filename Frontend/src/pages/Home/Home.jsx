import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  LayoutDashboard,
  Menu,
  MoveRight,
  Play,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import image1 from "../../assets/image-1.jpg";

const features = [
  {
    icon: LayoutDashboard,
    title: "One clear workspace",
    text: "Bring tasks, ownership and progress together in one focused workspace.",
  },
  {
    icon: Users,
    title: "Move work forward",
    text: "Know who owns what and make collaboration easier across your team.",
  },
  {
    icon: LayoutDashboard,
    title: "One clear workspace",
    text: "Use a simple visual workflow to turn unfinished work into meaningful progress.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#243027]">
      {/* navbar */}
      <header className="sticky top-0 z-50 border-b border-[#e9e7df] bg-[#fcfbf7] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#c9e9b5] text-[#30452b]">
              <Check strokeWidth={3} size={21} />
            </div>

            <span className="text-xl font-bold tracking-tight">Taskly</span>
          </a>

          {/* desktop navigation */}
          <nav className="hidded gap-8 items-center md:flex">
            <a
              href="#features"
              className="text-[#68736a] text-sm font-medium transition hover:text-[#243027]"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-[#68736a] text-sm font-medium transition hover:text-[#243027]"
            >
              Workflow
            </a>

            <a
              href="#teams"
              className="text-sm font-medium text-[#68736a] transition hover:text-[#243027]"
            >
              For teams
            </a>

            <a
              href="#about"
              className="text-[#68736a] text-sm font-medium transition hover:text-[#243027]"
            >
              About
            </a>
          </nav>

          {/* actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/login"
              className="text-[#4e5a52] text-sm rounded-xl px-4 py-2 font-semibold transition hover:bg-[#f0efe9]"
            >
              Sign In
            </a>

            <a
              href="/register"
              className="inline-flex gap-2 bg-[#243027] text-white items-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-[#344339]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* mobile button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 md:hidden"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#e9e7df] bg-[#fcfbf7] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#features">Features</a>
              <a href="#workflow">Workflow</a>
              <a href="#teams">For teams</a>
              <a href="#about">About</a>

              <div className="flex gap-3 border-t border-[#e9e7df] pt-5">
                <a
                  href="/login"
                  className="flex-1 rounded-xl py-3 border border-[#dddcd4] text-sm text-center font-semibold"
                >
                  Sign In
                </a>

                <a
                  href="/register"
                  className="flex-1 rounded-xl text-sm font-semibold text-white bg-[#243027] py-3 text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          {/* decors */}
          <div className="pointer-events-none absolute bg-[#e5f4d9] -left-40 top-20 rounded-full h-80 w-80 blur-3xl" />
          <div className="pointer-events-none absolute bg-[#fce3c9] -right-40 top-10 rounded-full h-96 w-96 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-28 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              {/* badge */}
              <div className="mb-7 inline-flex items-center gap-2 border border-[#dce8d4] rounded-full bg-[#f0f7e9] px-4 py-2 text-sm font-medium text-[#58734d]">
                <Sparkles size={15} />
                A calmer way to manage work
                <ChevronRight size={14} />
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] text-[#243027] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
                Less choas.
                <span className="block text-[#426b2d]">
                  More meaningful work.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-[#68736a] text-lg leading-8 sm:text-xl">
                Taskly gives modern teams a simple workspace to organize tasks,
                understand priorities, and keep work moving.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-[#243027] rounded-xl text-white px-6 py-3.5 text-sm font-semibold shadow-lg transition hover:bg-[#344339]"
                >
                  Start for free <ArrowRight size={16} />
                </a>

                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dddcd4] bg-white px-6 py-3.5 text-sm font-semibold text-[#465148] shadow-sm transition hover:bg-[#f7f6f1]"
                >
                  <Play size={14} fill="currentColor" />
                  Explore Taskly
                </a>
              </div>

              <div className="mt-5 flex gap-2 justify-center items-center text-xs text-[#879087]">
                <CircleCheck size={14} className="text-[#79a968]" />
                Simple setup
                <span>•</span>
                Built for focused teams
              </div>
            </div>

            {/* hero product */}
            <div className="relative mx-auto mt-16 max-w-6xl">
              <div className="absolute -inset-10 -z-10 bg-[#eaf4e2] rounded-full blur-3xl" />

              <div className="overflow-hidden border border-[#dddcd4] rounded-3xl bg-white shadow-[0_30px_80px_rgba(50,60,45,0.12)]">
                {/* browser bar */}
                <div className="flex h-12 items-center gap-2 border-b border-[#e9e8e2] bg-[#fafaf7] px-5">
                  <span className="h-2.5 w-2.5 bg-[#d7d8d1] rounded-full" />
                  <span className="h-2.5 w-2.5 bg-[#d7d8d1] rounded-full" />
                  <span className="h-2.5 w-2.5 bg-[#d7d8d1] rounded-full" />

                  <div className="mx-auto hidden h-7 bg-white border border-[#ecebe5] w-80 rounded-lg sm:block" />
                </div>

                <div className="flex min-h-125">
                  {/* sidebar */}
                  <aside className="hidden w-56 bg-white border-r border-[#e9e8e2] p-5 sm:block">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center bg-[#c9e9b5] h-8 w-8 rounded-lg">
                        <Check scale={16} />
                      </div>
                      <span className="font-bold">Taskly</span>
                    </div>

                    <p className="mb-3 mt-9 px-2 text-[10px] uppercase font-bold tracking-widest text-[#a0a79f]">
                      Workspace
                    </p>

                    <div className="space-y-1">
                      <SidebartItems
                        icon={<LayoutDashboard size={16} />}
                        text="Overview"
                        active
                      />
                      <SidebartItems
                        icon={<Check size={16} />}
                        text="My Tasks"
                      />
                      <SidebartItems
                        icon={<LayoutDashboard size={16} />}
                        text="Task Board"
                      />
                    </div>

                    <p className="mb-3 mt-9 px-2 text-[10px] uppercase font-bold tracking-widest text-[#a0a79f]">
                      Workspace
                    </p>

                    <SidebartItems icon={<Users size={16} />} text="Team" />
                  </aside>

                  {/* dashboard */}
                  <div className="flex-1 bg-[#fafbf8] p-5 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#929a92]">
                          Tuesday, September 8
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          Good morning, Jack
                        </h3>
                      </div>

                      <button className="bg-[#243027] text-xs text-white px-4 py-2.5 rounded-xl font-semibold hidden sm:block">
                        + New task
                      </button>
                    </div>

                    {/* stats */}
                    <div className="mt-7 grid grid-cols-3 gap-3">
                      <StatsCard
                        number="24"
                        label="Total tasks"
                        bg="bg-[#f4f7ef]"
                      />

                      <StatsCard
                        number="08"
                        label="In progress"
                        bg="bg-[#fff6ec]"
                      />
                      <StatsCard
                        number="16"
                        label="Completed"
                        bg="bg-[#f0f6f0]"
                      />
                    </div>

                    {/* board */}
                    <div className="mt-7 grid grid-cols-3 gap-3">
                      <BoardColumn title="To Do" count="3" dot="bg-[#adb5ab]">
                        <TaskCard
                          title="Design onboarding flow"
                          tag="Design"
                          initials="JD"
                          tagBg="bg-[#fff1e2]"
                          tagText="text-[#a66f3f]"
                        />

                        <TaskCard
                          title="Prepare API documentation"
                          tag="Docs"
                          initials="AM"
                          tagBg="bg-[#eef5e9]"
                          tagText="text-[#668354]"
                        />
                      </BoardColumn>

                      <BoardColumn title="Doing" count="2" dot="bg-[#e5a65f]">
                        <TaskCard
                          title="Build authentication"
                          tag="Development"
                          initials="AK"
                          tagBg="bg-[#eaf4e4]"
                          tagText="text-[#668354]"
                        />

                        <TaskCard
                          title="Create dashboard UI"
                          tag="Frontend"
                          initials="JD"
                          tagBg="bg-[#fff1e2]"
                          tagText="text-[#a66f3f]"
                        />
                      </BoardColumn>

                      <BoardColumn title="Done" count="4" dot="bg-[#80a76b]">
                        <TaskCard
                          title="Setup project structure"
                          tag="Development"
                          initials="AM"
                          completed
                          tagBg="bg-[#eef5e9]"
                          tagText="text-[#668354]"
                        />

                        <TaskCard
                          title="Create database schema"
                          tag="Backend"
                          initials="JD"
                          completed
                          tagBg="bg-[#fff1e2]"
                          tagText="text-[#a66f3f]"
                        />
                      </BoardColumn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* intro */}
        <section className="border-y border-[#e9e7df] bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8 py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#78966a]">
                Built for clarity
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.035em] text-[#243027] sm:text-4xl">
                Your work should feel organized, not overwhelming.
              </h2>
            </div>

            <p className="max-w-xl self-end text-base leading-7 text-[#6e776f]">
              Taskly keeps the important things visible without filling your
              workspace with unnecessary complexity. Create tasks, assign
              ownership, move work forward and see what matters next.
            </p>
          </div>
        </section>

        {/* features */}
        <section id="features" className="bg-[#fcfbf7] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm text-[#78966a] font-bold uppercase tracking-widest">
                Features
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Everything you need. <br /> Nothing you don't
              </h2>

              <p className="mt-5 text-base left-7 text-[#6e776f]">
                A focused set of tools designed to make everyday project
                management feel lighter.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* workflow */}
        <section id="workflow" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#78966a]">
                  Simple workflow
                </p>

                <h2 className="mt-4 font-bold tracking-[-0.04em] text-3xl sm:text-4xl">
                  From idea to done, <br /> one step at a time.
                </h2>

                <p className="mt-5 max-w-lg text-[#6e776f] leading-7 text-base">
                  Keep work moving through a clear workflow without drowning
                  your team in project-management overhead.
                </p>

                <div className="mt-9 space-y-6">
                  <WorkflowItem
                    number="01"
                    title="Create"
                    description="Capture the work that needs attention."
                  />

                  <WorkflowItem
                    number="02"
                    title="Move"
                    description="Drag tasks forward as work progresses."
                  />

                  <WorkflowItem
                    number="03"
                    title="Complete"
                    description="Keep finished work visible and celebrate progress."
                  />
                </div>
              </div>

              <div className="bg-[#fff7ec] rounded-[28px] p-6 sm:p-8">
                <div className="border border-[#eee4d8] rounded-2xl p-5 bg-white shadow-xl ">
                  <div className="flex items-center justify-between border-b border-[#eeeae2] pb-5">
                    <div>
                      <p className="text-xs text-[#9b9e97]">
                        Product workspace
                      </p>

                      <p className="mt-1 font-bold">Website launch</p>
                    </div>

                    <div className="font-semibold text-[#668354] bg-[#eef5e9] rounded-lg px-3 py-1.5 text-xs">
                      This week
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <ProgressTask
                      title="Design homepage"
                      status="Doing"
                      progress="72%"
                    />

                    <ProgressTask
                      title="Implement authentication"
                      status="Doing"
                      progress="48%"
                    />

                    <ProgressTask
                      title="Setup deployment"
                      status="Done"
                      progress="100%"
                    />

                    <ProgressTask
                      title="Write documentation"
                      status="To Do"
                      progress="0%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* image banner */}
        <section id="teams" className="relative h-120 overflow-hidden">
          <img
            src={image1}
            alt="modern workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#243027]/45" />

          <div className="relative mx-auto flex items-center justify-center px-6 h-full max-w-4xl text-center">
            <div>
              <p className="text-sm text-[#d9efc9] uppercase tracking-[0.2em] font-semibold">
                Work better together
              </p>

              <h2 className="mt-4 text-4xl text-white tracking-[-0.04em] font-bold sm:text-5xl">
                Give your work <br /> somewhere to belong.
              </h2>

              <a
                href="/register"
                className="mt-8 inline-flex items-center gap-2 bg-[#d4edc1] rounded-xl px-6 py-3 text-sm font-bold text-[#30452b] transition hover:bg-[#e0f3d1]"
              >
                Start using Taskly <MoveRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#fcfbf7] py-24" id="about">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto flex items-center justify-center rounded-2xl h-12 w-12 bg-[#c9e9b5] text-[#30452b]">
              <Check size={23} strokeWidth={3} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Ready to make work feel simpler?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6e776f]">
              Create your Taskly workspace and start turning scattered tasks
              into visible progress.
            </p>

            <a
              href="/register"
              className="inline-flex mt-8 items-center gap-2 rounded-xl text-white px-6 py-3 text-sm font-semibold bg-[#243027] shadow-lg transition hover:bg-[#344339]"
            >
              Get started with Taskly <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t border-[#e7e5dd] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-9 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center h-8 w-8 bg-[#c9e9b5] rounded-lg">
              <Check size={16} />
            </div>

            <span className="font-bold">Taskly</span>
          </div>

          <p className="text-xs text-[#899089]">
            &copy; 2026 Taskly. Built for better work
          </p>

          <div className="flex gap-5 text-xs font-medium text-[#69736b]">
            <a href="#" className="hover:text-[#243027]">
              Privacy
            </a>

            <a href="#" className="hover:text-[#243027]">
              Terms
            </a>

            <a href="#" className="hover:text-[#243027]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// components
function SidebartItems({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold ${active ? "bg-[#eef5e9] text-[#58734d]" : "text-[#7d857e]"}`}
    >
      {icon}
      {text}
    </div>
  );
}

function StatsCard({ number, label, bg }) {
  return (
    <div className={`rounded-2xl border border-[#e8e8e1] ${bg} p-4`}>
      <p className="text-[11px] font-medium text-[#7d857e]">{label}</p>

      <p className="mt-1 text-2xl font-black tracking-tight">{number}</p>
    </div>
  );
}

function BoardColumn({ title, count, dot, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />

        <span className="text-xs font-bold">{title}</span>

        <span className="bg-[#eeeee9] rounded-md px-1.5 py-0.5 text-[10px] font-medium text-[#7f877f]">
          {count}
        </span>
      </div>

      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function TaskCard({ title, tag, initials, completed, tagBg, tagText }) {
  return (
    <div className="border border-[#e6e6df] rounded-xl bg-white p-3.5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p
          className={`text-[11px] font-semibold leading-5 ${completed ? "text-[#a0a69f] line-through" : "text-[#344038]"}`}
        >
          {title}
        </p>

        <CircleCheck
          size={14}
          className={
            completed ? "shrink-0 text-[#7aa568]" : "shrink-0 text-[#dfe2dc]"
          }
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-md px-2 py-1 text-[9px] font-bold ${tagBg} ${tagText}`}
        >
          {tag}
        </span>

        <div className="flex h-6 w-6 justify-center items-center bg-[#334039] rounded-full font-bold text-[8px] text-white">
          {initials}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="group rounded-[22px] border border-[#e5e4dc] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-[#eef5e9] text-[#69895c] transition group-hover:bg-[#dceece]">
        <Icon size={21} />
      </div>

      <h3 className="mt-6 text-lg font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#737c74]">{text}</p>

      <div className="mt-6 flex items-center gap-1 font-bold text-[#718d65] text-xs">
        Learn more <ArrowRight size={13} />
      </div>
    </div>
  );
}

function WorkflowItem({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center h-9 w-9 shrink-0 bg-[#f0f5ec] rounded-xl text-xs font-bold text-[#69895c]">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-bold">{title}</h3>

        <p className="mt-1 text-[#778078] text-sm leading-6">{description}</p>
      </div>
    </div>
  );
}

function ProgressTask({ title, status, progress }) {
  const statusClass =
    status === "Done"
      ? "bg-[#edf5e9] text-[#648052]"
      : status === "Doing"
        ? "bg-[#fff1e2] text-[#a36f40]"
        : "bg-[#f0f1ed] text-[#788078]";

  return (
    <div className="border border-[#ebe9e2] p-4 rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#404b43] font-semibold">{title}</p>

        <span
          className={`text-[10px] px-2 py-1 rounded-md font-bold ${statusClass}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden bg-[#eeeeea] rounded-full">
          <div
            className="h-full rounded-full bg-[#8db476]"
            style={{ width: progress }}
          />
        </div>

        <span className="text-[#929991] text-[10px] font-bold">{progress}</span>
      </div>
    </div>
  );
}
