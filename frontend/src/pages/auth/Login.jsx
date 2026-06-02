import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { saveAuthData } from "../../config/storage";
import { isValidEmail } from "../../utils/validators";
import AuthHeader from "../../components/common/AuthHeader";

const initialForm = {
  email: "",
  password: "",
  rememberMe: true,
};

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function getRedirectPath(role) {
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "DOCTOR") return "/doctor/dashboard";
    return "/patient/dashboard";
  }

  function validateForm() {
    if (!form.email.trim()) return "Email is required";
    if (!isValidEmail(form.email)) return "Invalid email format";
    if (!form.password) return "Password is required";
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      saveAuthData({
        token: data.token,
        user: data.user,
      });

      navigate(getRedirectPath(data.user.role));
    } catch (error) {
      setError(error.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-8">
      <div className="absolute left-8 top-36 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        ))}
      </div>

      <div className="absolute right-10 top-72 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        ))}
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
        


        <AuthHeader/>

        <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <span className="text-4xl">👤</span>
          </div>

          <div className="mb-7 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-slate-500">
              Sign in to access your Medibook account
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Email Address
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mr-3 text-slate-400">✉️</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-none py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Password
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mr-3 text-slate-400"></span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border-none py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-blue-600"
                >
                  
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 accent-blue-600"
                />
                Remember me
              </label>

              <button
                type="button"
                className="font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>↪</span>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-5 w-full rounded-xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600">
              🛡️
            </div>

            <div>
              <h3 className="font-bold text-blue-700">Secure & Trusted</h3>
              <p className="mt-1 text-sm text-slate-600">
                Your data is protected with industry-standard security.
                We never share your information with anyone.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          © 2026 Medibook. All rights reserved.
        </p>
      </section>
    </main>
  );
}