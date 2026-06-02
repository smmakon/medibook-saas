import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { isValidEmail } from "../../utils/validators";
import AuthHeader from "../../components/common/AuthHeader";
import toast from "react-hot-toast";
import { CircleHelp } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPassword(email.trim().toLowerCase());

      setLinkSent(true);
      toast.success(data.message || "Reset link sent successfully");
    } catch (error) {
      setError(error.message || "Unable to send reset link");
      toast.error(error.message || "Unable to send reset link");
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
            <span className="text-4xl"> <CircleHelp size={24} />  </span>
          </div>

          <div className="mb-7 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Forgot Password?
            </h2>
            <p className="mt-2 text-slate-500">
              Enter your email address and we will send you a link to reset your password.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              ⚠️ {error}
            </div>
          )}

          {linkSent && (
            <div className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Check your inbox</p>
              <p className="mt-1">
                If an account exists with this email, a reset link has been sent.
                Please check your inbox and spam folder.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email Address
              </label>

              <div className="flex items-center rounded-lg border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mr-3 text-slate-400">✉️</span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border-none py-3 outline-none"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Enter the email address associated with your account.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>✈️</span>
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-500">or</span>
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
              <h3 className="font-bold text-green-700">Your security matters</h3>
              <p className="mt-1 text-sm text-slate-600">
                We never ask for your password by email. Use only the secure reset link.
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