import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPatient from "../pages/auth/RegisterPatient";

function LoginPlaceholder() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">
          Login Page Coming Soon
        </h1>
        <p className="mt-2 text-slate-500">
          The login page will be implemented in the next Jira task.
        </p>
      </div>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/login" element={<LoginPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}