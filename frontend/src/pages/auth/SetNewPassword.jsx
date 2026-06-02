import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import {
  isSameValue,
  isStrongEnoughPassword,
} from "../../utils/validators";
import AuthHeader from "../../components/common/AuthHeader";
import toast from "react-hot-toast";
import { KeyRound } from "lucide-react";

export default function SetNewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!form.password) return "New password is required";

    if (!isStrongEnoughPassword(form.password)) {
      return "Password must contain at least 8 characters";
    }

    if (!form.confirmPassword) return "Confirm password is required";

    if (!isSameValue(form.password, form.confirmPassword)) {
      return "Passwords do not match";
    }

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

      const data = await resetPassword({
        token,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      toast.success(data.message || "Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message || "Unable to reset password");
      toast.error(error.message || "Unable to reset password");
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
        <AuthHeader />

        <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <span className="text-4xl"> <KeyRound size={24} /> </span>
          </div>

          <div className="mb-7 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-slate-500">
              Create a new password for your account. Make sure it is strong and secure.
            </p>
          </div>

          <div className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4 text-sm text-slate-600">
            <p>
              🛡️ For your security, please choose a strong password that you do not use on other websites.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                New Password
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mr-3 text-slate-400"> </span>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border-none py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-blue-600"
                >
                  👁️
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Password must be at least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Confirm New Password
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mr-3 text-slate-400"></span>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border-none py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-blue-600"
                >
                  👁️
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>🔄</span>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm">
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              ← Back to Login
            </Link>
          </p>
        </div>

        <div className="mt-5 w-full rounded-xl border border-green-100 bg-green-50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600">
              🛡️
            </div>

            <div>
              <h3 className="font-bold text-green-700">Secure & Private</h3>
              <p className="mt-1 text-sm text-slate-600">
                Your password will be encrypted and stored securely. We never share your information.
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