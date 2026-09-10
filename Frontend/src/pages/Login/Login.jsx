import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { token, user } = response.data;

      // store authentication data
      localStorage.setItem("tasklyToken", token);
      localStorage.setItem("tasklyUser", JSON.stringify(user));

      //   redirecting according to role
      if (user.role === "admin") {
        navigate("/admin/overview");
      } else {
        navigate("/app/overview");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again...";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfbf7]">
      <div className="relative mx-auto h-screen w-full overflow-hidden sm:min-h-[calc(100vh-3rem)]">
        <div className="pointer-events-none absolute -right-24 bg-[#dceece] -top-24 h-80 w-80 rounded-full opacity-70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 bg-[#fce3c9] left-1/3 h-80 w-80 rounded-full opacity-70 blur-3xl" />

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-7rem)] px-5 pb-10 sm:px-10 lg:px-16 ">
          <div className="grid w-full items-center gap-10 max-w-6xl lg:grid-cols-[1fr_460px] lg:gap-20">
            {/* left */}
            <section className="hidden lg:block mt-10">
              <div className="mt-8 mb-4 inline-flex items-center gap-2 border border-[#dbe5d5] rounded-full bg-white/70 px-4 py-2 text-xs font-bold tracking-wide text-[#637d58] shadow-sm backdrop-blur">
                <Sparkles size={14} />
                YOUR WORKSPACE AWAITS
              </div>

              <h1 className="max-w-2xl text-6xl text-[#243027] font-extrabold tracking-[-0.055em] xl:text-7xl">
                Pick up
                <span className="block text-[#78966a]">
                  where you left off.
                </span>
              </h1>

              <p className="mt-3 max-w-7xl text-base leading-6 text-[#737c73]">
                Your tasks, ideas, priorities, and progress are all waiting for
                you. Sign in and get back to meaningful work without unnecessary
                complexity.
              </p>

              <div className="mt-6 max-w-xl border border-[#e0e6dc] rounded-[1.7em] bg-white/80 p-4 shadow-[0_18px_50px_rgba(36,48,39,0.07)] backdrop-blur">
                <div className="bg-[#f5f7f2] rounded-[1.25em] p-4">
                  {/* mini top bar */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="bg-[#ccd8c6] rounded-full h-2.5 w-24" />
                      <div className="bg-[#e0e6dc] mt-2 rounded-full h-2 w-16" />
                    </div>

                    <div className="flex -space-x-2">
                      <div className="border border-[#f5f7f2] h-7 w-7 rounded-full bg-[#e7b98e]" />
                      <div className="border border-[#f5f7f2] h-7 w-7 rounded-full bg-[#b8d7a8]" />
                      <div className="border border-[#f5f7f2] h-7 w-7 rounded-full bg-[#f3c99d]" />
                    </div>
                  </div>

                  {/* mini board */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-wide text-[#8a9389]">
                          To Do
                        </span>

                        <span className="text-[9px] font-bold text-[#b0b7ae]">
                          3
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="h-12 bg-[#fff7ec] p-2 rounded-lg">
                          <div className="bg-[#e9c79f] h-1.5 w-16 rounded-full" />
                          <div className="bg-[#eee4d7] mt-2 h-1 w-10 rounded-full" />
                        </div>

                        <div className="bg-[#fafbf8] h-10 rounded-lg" />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-wide text-[#8a9389]">
                          Doing
                        </span>

                        <span className="text-[9px] font-bold text-[#b0b7ae]">
                          2
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="h-12 bg-[#eef5e9] p-2 rounded-lg">
                          <div className="bg-[#a8c597] h-1.5 w-16 rounded-full" />
                          <div className="bg-[#dfe9da] mt-2 h-1 w-10 rounded-full" />
                        </div>

                        <div className="bg-[#fafbf8] h-10 rounded-lg" />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-wide text-[#8a9389]">
                          Done
                        </span>

                        <span className="text-[9px] font-bold text-[#b0b7ae]">
                          4
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="h-12 bg-[#f1f4ee] p-2 rounded-lg">
                          <div className="bg-[#b7c5b1] h-1.5 w-16 rounded-full" />
                          <div className="bg-[#e0e6dc] mt-2 h-1 w-10 rounded-full" />
                        </div>

                        <div className="bg-[#fafbf8] h-10 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 px-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#dceece] text-[#66855b]">
                    <Check size={15} strokeWidth={3} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#435044]">
                      Your team is moving forward
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#909990]">
                      Everything stays organized in one place.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* login card */}
            <section className="w-full mt-20">
              {/* mobile heading */}
              <div className="mb-7 text-center lg:hidden">
                <div className="mx-auto flex items-center justify-center h-12 w-12 mb-5 bg-[#dceece] text-[#617e55] rounded-2xl">
                  <Check size={22} strokeWidth={3} />
                </div>

                <p className="mb-2 uppercase font-bold text-xs tracking-[0.18em] text-[#78966a]">
                  Welcome back
                </p>

                <h1 className="text-[#243027] text-4xl font-extrabold tracking-[-0.04em]">
                  Good to see you.
                </h1>

                <p className="mx-auto text-sm leading-6 text-[#7b837b] mt-3 max-w-sm">
                  Sign in to continue managing your work with taskly.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#e1e6de] rounded-4xl shadow-[0_25px_70px_rgba(36,48,39,0.09)] sm:p-9">
                {/* card header */}
                <div className="mb-3 hidden lg:block">
                  <div className="mb-3 flex items-center justify-center bg-[#eef5e9] h-11 w-11 rounded-2xl text-[#66855b]">
                    <LockKeyhole size={19} />
                  </div>

                  <p className="mb-1 uppercase text-xs font-bold tracking-[0.16em] text-[#78966a]">
                    Welcome back
                  </p>

                  <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-[#243027]">
                    Sign in to Taskly.
                  </h2>

                  <p className="my-2 text-sm leading-6 text-[#7b837b]">
                    Continue where you left off and keep your work moving.
                  </p>
                </div>

                {/* error */}
                {error && (
                  <div className="mb-5 border border-red-200 flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium leading-5 text-red-600">
                    <span className="mt-1 shrink-0 bg-red-400 rounded-full h-1.5 w-1.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-semibold text-[#39443b]"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa49a]"
                      />

                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        autoComplete="email"
                        className="w-full h-10 border border-[#dfe5dc] rounded-xl bg-[#fafbf8] pl-11 pr-4 text-sm text-[#243027] outline-none transition placeholder:text-[#a5ada5] focus:border-[#a7c796] focus:bg-white focus:ring-4 focus:ring-[#dceece]/60"
                      />
                    </div>
                  </div>

                  {/* password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-[#39443b] font-semibold"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-xs font-semibold text-[#78966a] transition hover:text-[#52694a]"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa49a]"
                      />

                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Please enter your password"
                        autoComplete="current-password"
                        className="w-full h-10 border border-[#dfe5dc] rounded-xl bg-[#fafbf8] pl-11 pr-4 text-sm text-[#243027] outline-none transition placeholder:text-[#a5ada5] focus:border-[#a7c796] focus:bg-white focus:ring-4 focus:ring-[#dceece]/60"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute text-[#929b92] top-1/2 right-4 -translate-y-1/2 transition hover:text-[#52694a]"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center cursor-pointer gap-3 pt-1">
                    <input type="checkbox" className="peer sr-only" />

                    <span className="flex justify-center items-center h-5 w-5 border border-[#d6ddd2] rounded-md bg-[#fafbf8] text-transparent transition peer-checked:border-[#78966a] peer-checked:bg-[#78966a] peer-checked:text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>

                    <span className="text-xs font-medium text-[#7b837b]">
                      Keep me signed in
                    </span>
                  </label>

                  {/* submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center justify-center h-10 w-full mt-2 gap-3 bg-[#78966a] rounded-xl px-6 text-white text-sm font-bold shadow-[0_12px_25px_rgba(120,150,106,0.22)] transition hover:-translate-y-0.5 hover:bg-[#688759] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Signing you in..." : "Sign in"}

                    {!loading && (
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                {/* register link */}
                <div className="mt-7 text-center border-t border-[#edf0eb] pt-6">
                  <p className="text-sm text-[#8b938b]">
                    Don't have a Taskly account?{" "}
                    <Link
                      to="/register"
                      className="font-bold text-[#66855b] transition hover:text-[#4f7047]"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs text-center text-[#a0a7a0]">
                &copy; 2026 Taskly • Keep work moving.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
