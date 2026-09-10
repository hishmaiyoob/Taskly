import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import image2 from "../../assets/image-2.jpg";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!formData.password) {
      setError("Please enter a password");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfbf7]">
      <div className="mx-auto flex w-full overflow-hidden h-screen">
        {/* left */}
        <section className="relative w-[48%] overflow-hidden bg-[#dceece] lg:block hidden">
          <img
            src={image2}
            alt="Taskly workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#52694a]/40" />

          {/* logo */}
          <div className="absolute left-10 top-9 z-10 flex items-center gap-3">
            <div className="flex bg-white text-[#52694a] h-10 w-10 items-center justify-center rounded-xl shadow-sm">
              <Check size={20} strokeWidth={3} />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-white">
              Taskly
            </span>
          </div>

          {/* main card */}
          <div className="absolute bottom-10 left-10 right-10 z-10">
            <div className="max-w-lg rounded-[27px] border border-white/30 bg-white/85 p-7 shadow-2xl backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[#eaf5e4] px-3 py-1.5 text-xs font-semibold text-[#52694a]">
                  YOUR WORKSPACE
                </span>

                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-[#f3c99d]" />
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-[#b8d7a8]" />
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-[#e7b98e]" />
                </div>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-[#243027] tracking-tight">
                Turn scattered work into
                <span className="text-[#718f62]"> clear progress.</span>
              </h2>

              <p className="mt-4 text-sm max-w-md leading-6 text-[#657064]">
                Organize tasks, keep everyone aligned, and move important work
                forward without the usual project-management clutter.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e2e9de]">
                  <div className="h-2 rounded-full bg-[#78966a] w-[72%]" />
                </div>

                <span className="text-xs text-[#52694a] font-bold">72%</span>
              </div>
            </div>
          </div>
        </section>

        {/* right */}
        <section className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            {/* mobile logo */}
            <div className="mb-10 flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center bg-[#dceece] text-[#52694a] rounded-xl">
                <Check size={18} strokeWidth={3} />
              </div>

              <span className="text-xl font-extrabold text-[#243027]">
                Taskly
              </span>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-xs uppercase font-bold tracking-[0.18em] text-[#78966a]">
                Get started
              </p>

              <h1 className="text-4xl font-extrabold text-[#243027] tracking-[-0.04em] sm:text-5xl">
                Make work feel
                <span className="block text-[#78966a]"> a little lighter.</span>
              </h1>

              <p className="mt-4 max-w-sm text-[14px] leading-4.5 text-[#747c74]">
                Create your taskly account and start bringing your work together
                in one calm, organized space.
              </p>
            </div>

            {/* error */}
            {error && (
              <div className="mb-5 border border-red-200 rounded-xl bg-red-50 text-[13px] px-4 py-2 font-medium text-red-600">
                {error}
              </div>
            )}

            {/* success */}
            {success && (
              <div className="mb-5 border border-[#cce3bd] rounded-2xl text-sm bg-[#f0f8eb] text-[#5c8050] px-4 py-3 font-medium">
                {success} Redirecting to login...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-semibold text-sm text-[#39443b]"
                >
                  Your name
                </label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="text-[#9aa49a] absolute left-4 top-1/2 -translate-y-1/2"
                  />

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    className="h-10 w-full border border-[#dfe5dc] rounded-xl bg-[#fafbf8] pl-12 pr-4 text-sm text-[#243027] outline-none transition placeholder:text-[#a5ada5] focus:border-[#a7c796] focus:bg-white focus:ring-4 focus:ring-[#dceece]/60"
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-sm text-[#39443b]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="text-[#9aa49a] absolute left-4 top-1/2 -translate-y-1/2"
                  />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    autoComplete="email"
                    className="h-10 w-full border border-[#dfe5dc] rounded-xl bg-[#fafbf8] pl-12 pr-4 text-sm text-[#243027] outline-none transition placeholder:text-[#a5ada5] focus:border-[#a7c796] focus:bg-white focus:ring-4 focus:ring-[#dceece]/60"
                  />
                </div>
              </div>

              {/* password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block font-semibold text-sm text-[#39443b]"
                  >
                    Password
                  </label>

                  <span className="text-xs text-[#9aa49a]">
                    Minimum 6 characters
                  </span>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={16} 
                    className="text-[#9aa49a] absolute left-4 top-1/2 -translate-y-1/2"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    className="h-10 w-full border border-[#dfe5dc] rounded-xl bg-[#fafbf8] pl-12 pr-4 text-sm text-[#243027] outline-none transition placeholder:text-[#a5ada5] focus:border-[#a7c796] focus:bg-white focus:ring-4 focus:ring-[#dceece]/60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition text-[#929b92] hover:text-[#52694a]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* terms */}
              <div className="flex items-start gap-3 pt-1">
                <div className="mt-0.5 flex items-center justify-center h-5 w-5 shrink-0 rounded-md bg-[#dceece] text-[#5d8050]">
                  <Check size={13} strokeWidth={3} />
                </div>

                <p className="text-xs text-[#7b837b] leading-4">
                  By craeting an account, you agree to use Taskly responsibly
                  and keep your account credentials secure.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center h-11 w-full gap-3 bg-[#78966a] rounded-xl px-6 text-sm font-bold text-white shadow-[0_12px_25px_rgba(120,150,106,0.22)] transition hover:-translate-y-0.5 hover:bg-[#688759] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create my account"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e8ebe6]" />
              <span className="text-sm font-medium text-[#a0a7a0]">
                Already part of Taskly?
              </span>
              <Link className="text-sm font-medium text-[#719571] underline">
                Sign In
              </Link>
              <div className="h-px flex-1 bg-[#e8ebe6]" />
            </div>

            <p className="mt-4 text-center text-xs text-[#a0a7a0]">
              &copy; 2026 Taskly. Keep work moving.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
