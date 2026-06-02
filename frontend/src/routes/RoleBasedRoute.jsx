import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useAuth } from "../context/AuthContext";

export default function RoleBasedRoute({ allowedRoles }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}