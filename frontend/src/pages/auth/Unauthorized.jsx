import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
          🚫
        </div>

        <h1 className="text-3xl font-bold text-slate-900">Access Denied</h1>

        <p className="mt-3 text-slate-500">
          You do not have permission to access this page.
        </p>

        <Link
          to={ROUTES.LOGIN}
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to Login
        </Link>
      </section>
    </main>
  );
}