import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  LayoutDashboard,
  LockKeyhole,
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
            <div className="relative w-full overflow-hidden mt-20 h-130">
              {/* decor */}
              <div className="pointer-events-none absolute left-[12%] top-[20%] bg-[#e5f4d9] rounded-full h-72 w-72 blur-3xl opacity-70" />
              <div className="pointer-events-none absolute right-[15%] top-[5%] bg-[#fce3c9] rounded-full h-64 w-64 blur-3xl opacity-70" />

              {/* decorive dots */}
              <div className="absolute bg-[#b8d49f] h-3 w-3 rounded-full left-[10%] top-[12%] sm:block hidden" />
              <div className="absolute bg-[#e5aa70] h-2 w-2 rounded-full left-[28%] bottom-[14%] sm:block hidden" />
              <div className="absolute bg-[#c7d9bc] h-2 w-2 rounded-full right-[42%] top-[10%] sm:block hidden" />

              {/* left - card */}
              <div className="absolute border border-[#e2e6dc] w-64 p-4 rounded-2xl left-[2%] top-[24%] bg-white sm:block hidden rotate-[-7deg] shadow-[0_25px_55px_rgba(36,48,39,0.12)] transition duration-300 hover:-translate-y-2 hover:rotate-[-4deg]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="bg-[#fff1e2] rounded-full px-2.5 py-1 text-[10px] text-[#a66f3f] font-bold">
                    Design
                  </span>

                  <span className="text-[11px] text-[#a3aaa2]">Today</span>
                </div>

                <h3 className="text-sm font-bold text-[#29342c]">
                  Design onboarding flow
                </h3>

                <p className="mt-2 text-[11px] text-[#8b948c] leading-5">
                  Create a simpler first-time experience for new users.
                </p>

                <div className="mt-5 flex items-center justify-between ">
                  <div className="flex -space-x-2">
                    <div className="flex items-center justify-center h-7 w-7 bg-[#d9b18a] text-white rounded-full border-2 border-white text-[8px] font-bold">
                      JD
                    </div>

                    <div className="flex items-center justify-center h-7 w-7 bg-[#abc99b] text-white rounded-full border-2 border-white text-[8px] font-bold">
                      AM
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#899289] font-semibold">
                    <CircleCheck size={13} className="text-[#7ca46c]" />
                    2/4
                  </div>
                </div>
              </div>

              {/* upper left - card */}
              <div className="absolute border border-[#e2e6dc] p-4 w-52 rounded-2xl bg-[#f9fbf7] left-[20%] top-[7%] sm:block hidden rotate-[4deg] shadow-[0_20px_45px_rgba(36,48,39,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center h-9 w-9 bg-[#dceece] rounded-xl text-[#66855b]">
                    <Check size={17} strokeWidth={2.5} />
                  </div>

                  <span className="font-bold uppercase text-[10px] text-[#a0a79f] tracking-wider">
                    Done
                  </span>
                </div>

                <p className="mt-4 text-[#39443b] text-xs font-bold">
                  Project structure
                </p>

                <div className="mt-3 h-1.5 w-full bg-[#e4e9df] rounded-full">
                  <div className="bg-[#8cad7b] h-1.5 w-full rounded-full" />
                </div>
              </div>

              {/* center card */}
              <div className="absolute w-72 border border-[#e1e5dc] p-5 rounded-2xl bg-white left-[27%] top-[40%] z-20 sm:block hidden rotate-2 shadow-[0_30px_65px_rgba(36,48,39,0.14)] transition duration-300 hover:-translate-y-2 hover:rotate-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#9aa29a]">
                      In progress
                    </p>

                    <h3 className="mt-1 text-[#29342c] text-base font-bold">
                      Build authentication
                    </h3>
                  </div>

                  <div className="flex items-center justify-center w-9 h-9 bg-[#eef5e9] rounded-xl text-[#668354]">
                    <LockKeyhole size={16} />
                  </div>
                </div>

                <p className="mt-3 text-[#858e86] text-xs leading-5">
                  Secure login, registration and role-based access.
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#b9d4a9] h-7 w-7 rounded-full" />

                    <span className="text-[#737d74] text-[10px] font-semibold">
                      Alex
                    </span>
                  </div>

                  <span className="bg-[#fff6ec] rounded-full text-[10px] px-2.5 py-1 font-bold text-[#a66f3f]">
                    Development
                  </span>
                </div>
              </div>

              {/* small notification */}
              <div className="absolute w-48 border border-[#e3e7df] p-3.5 rounded-2xl lg:block hidden bg-white/95 left-[7%] bottom-[13%] rotate-[5deg] shadow-[0_20px_45px_rgba(36,48,39,0.1)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-9 w-9 shrink-0 bg-[#c9e9b5] rounded-xl text-[#557449]">
                    <CircleCheck size={17} />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-[#3b473d]">
                      Task complete
                    </p>

                    <p className="mt-0.5 text-[9px] text-[#929a92]">
                      Database schema
                    </p>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="absolute w-162.5 right-[-18%] top-[5%] -rotate-3 sm:right-[-13%] lg:right-[-8%] xl:right-[-3%]">
                <div className="border border-[#dfe4da] bg-white p-2 rounded-4xl shadow-[0_35px_90px_rgba(36,48,39,0.16)]">
                  {/* top bar */}
                  <div className="flex items-center justify-between h-12 border-b border-[#edf0ea] px-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center h-7 w-7 bg-[#c9e9b5] rounded-lg">
                        <Check size={14} />
                      </div>

                      <span className="text-[#303b32] text-xs font-bold">
                        Taskly
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-[#f3f5f1] h-7 w-20 rounded-lg" />
                      <div className="bg-[#b9d4a9] h-7 w-7 rounded-full" />
                    </div>
                  </div>

                  <div className="flex min-h-97.5">
                    {/* mini sidebar */}
                    <div className="w-36 bg-[#fcfdfb] border-r border-[#edf0ea] p-4 shrink-0">
                      <div className="mb-7 bg-[#dfe6db] h-2 w-16 rounded-full" />

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 bg-[#eef5e9] rounded-lg px-2.5 py-2">
                          <LayoutDashboard
                            size={12}
                            className="text-[#6d8c60]"
                          />
                          <span className="text-[9px] text-[#668354] font-bold">
                            Overview
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-2">
                          <Check size={12} className="text-[#a2aaa2]" />
                          <span className="text-[9px] text-[#8d968e]">
                            My Tasks
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-2">
                          <LayoutDashboard
                            size={12}
                            className="text-[#a2aaa2]"
                          />
                          <span className="text-[9px] text-[#8d968e]">
                            Board
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#e5e9e2] h-2 w-20 mt-10 rounded-full" />

                      <div className="mt-4 h-7 rounded-lg bg-[#f4f6f2]" />
                      <div className="mt-2 h-7 rounded-lg bg-[#f4f6f2]" />
                    </div>

                    {/* dashboard content */}
                    <div className="flex-1 bg-[#fafbf8] p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="bg-[#d8dfd5] h-2 w-24 rounded-full" />

                          <div className="mt-2 bg-[#c7d2c3] h-4 w-40 rounded-full" />
                        </div>

                        <div className="bg-[#243027] h-8 w-20 rounded-lg" />
                      </div>

                      {/* mini stats */}
                      <div className="mt-6 grid grid-cols-3 gap-3">
                        <div className="bg-[#eef5e9] p-4 rounded-xl">
                          <div className="bg-[#b7cda9] h-5 w-10 rounded" />
                          <div className="bg-[#d6e3d0] mt-2 h-2 w-16 rounded" />
                        </div>

                        <div className="bg-[#fff5e9] p-4 rounded-xl">
                          <div className="bg-[#e6bf91] h-5 w-10 rounded" />
                          <div className="bg-[#f0dfcb] mt-2 h-2 w-16 rounded" />
                        </div>

                        <div className="bg-[#f1f4ee] p-4 rounded-xl">
                          <div className="bg-[#b7c5b1] h-5 w-10 rounded" />
                          <div className="bg-[#dfe5dc] mt-2 h-2 w-16 rounded" />
                        </div>
                      </div>

                      {/* mini task board */}
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {/* to do */}
                        <div className="bg-white p-3 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-[#6f786f] font-bold">
                              TO DO
                            </span>

                            <span className="text-[8px] text-[#a3aaa3]">3</span>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="bg-[#fff7ec] p-2.5 rounded-lg">
                              <div className="bg-[#e7c69e] h-2 w-20 rounded" />
                              <div className="bg-[#eee2d3] mt-2 h-1.5 w-12 rounded" />
                            </div>

                            <div className="bg-[#f7f8f5] h-12 rounded-lg" />
                          </div>
                        </div>

                        {/* doing */}
                        <div className="bg-white p-3 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-[#6f786f] font-bold">
                              DOING
                            </span>

                            <span className="text-[8px] text-[#a3aaa3]">3</span>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="bg-[#eef5e9] p-2.5 rounded-lg">
                              <div className="bg-[#abc89c] h-2 w-20 rounded" />
                              <div className="bg-[#dbe8d5] mt-2 h-1.5 w-12 rounded" />
                            </div>

                            <div className="bg-[#f7f8f5] h-12 rounded-lg" />
                          </div>
                        </div>

                        {/* done */}
                        <div className="bg-white p-3 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-[#6f786f] font-bold">
                              TO DO
                            </span>

                            <span className="text-[8px] text-[#a3aaa3]">3</span>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="bg-[#f1f4ee] p-2.5 rounded-lg">
                              <div className="bg-[#b5c3af] h-2 w-20 rounded" />
                              <div className="bg-[#dfe5dc] mt-2 h-1.5 w-12 rounded" />
                            </div>

                            <div className="bg-[#f7f8f5] h-12 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[7%] right-[27%] hidden rounded-full border border-[#dfe7da] bg-white/90 px-4 py-2 text-[10px] font-bold text-[#66745f] shadow-[0_15px_35px_rgba(36,48,39,0.08)] backdrop-blur lg:flex lg:items-center lg:gap-2">
                <span className="h-2 w-2 rounded-full bg-[#8caf7b]" />
                Everything in one place
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
