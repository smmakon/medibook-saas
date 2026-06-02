import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export default function PatientDashboard() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Patient Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome to your patient dashboard.
          </p>
        </div>

        <Link
          to={ROUTES.LOGOUT}
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Logout
        </Link>
      </div>
    </main>
  );
}