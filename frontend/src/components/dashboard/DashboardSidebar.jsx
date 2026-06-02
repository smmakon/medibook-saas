import { Link, useLocation } from "react-router-dom";

import {
  Calendar,
  Clock,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";

function getMenuItems(role) {
  if (role === "ADMIN") {
    return [
      {
        label: "Dashboard",
        path: ROUTES.ADMIN_DASHBOARD,
        icon: Home,
      },
      {
        label: "Users",
        path: "/admin/users",
        icon: Users,
      },
      {
        label: "Create Doctor",
        path: "/admin/doctors/create",
        icon: UserPlus,
      },
      {
        label: "Create Admin",
        path: "/admin/admins/create",
        icon: UserPlus,
      },
      {
        label: "Appointments",
        path: "/admin/appointments",
        icon: Calendar,
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ];
  }

  if (role === "DOCTOR") {
    return [
      {
        label: "Dashboard",
        path: ROUTES.DOCTOR_DASHBOARD,
        icon: Home,
      },
      {
        label: "Appointments",
        path: "/doctor/appointments",
        icon: Calendar,
      },
      {
        label: "Availability",
        path: "/doctor/availability",
        icon: Clock,
      },
      {
        label: "Unavailability",
        path: "/doctor/unavailability",
        icon: Clock,
      },
      {
        label: "Patients",
        path: "/doctor/patients",
        icon: Users,
      },
      {
        label: "Profile",
        path: "/doctor/profile",
        icon: User,
      },
    ];
  }

  return [
    {
      label: "Dashboard",
      path: ROUTES.PATIENT_DASHBOARD,
      icon: Home,
    },
    {
      label: "Appointments",
      path: "/patient/appointments",
      icon: Calendar,
    },
    {
      label: "History",
      path: "/patient/history",
      icon: Clock,
    },
    {
      label: "Medical Records",
      path: "/patient/medical-history",
      icon: FileText,
    },
    {
      label: "Profile",
      path: "/patient/profile",
      icon: User,
    },
  ];
}

export default function DashboardSidebar({
  isOpen,
  onClose,
}) {
  const { user } = useAuth();

  const location = useLocation();

  const menuItems = getMenuItems(
    user?.role
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-white px-5 py-6 transition-transform duration-300 lg:static lg:translate-x-0 lg:flex lg:flex-col ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Medibook
              </h1>

              <p className="text-sm text-slate-500">
                SaaS Medical
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <Icon size={21} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 pt-6">
          <Link
            to={ROUTES.LOGOUT}
            className="flex items-center gap-4 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={21} />
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}