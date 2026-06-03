import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Menu, User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";
import { PAGE_META } from "../../config/pageMeta";

export default function DashboardTopbar({ onMenuClick }) {
  const { user } = useAuth();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const pageInfo = useMemo(() => {
    return (
      PAGE_META[location.pathname] || {
        title: "Dashboard",
        subtitle: "Manage your MediBook workspace.",
      }
    );
  }, [location.pathname]);

  const avatarUrl = user?.avatarUrl || user?.profileImage || null;

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`;

  return (
    <header className="flex h-24 items-center justify-between bg-slate-50 px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-white lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            {pageInfo.title}
          </h1>

          <p className="hidden text-sm text-slate-500 md:block">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-white hover:text-blue-600">
          <Bell size={22} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User"
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600">
                {initials || <User size={20} />}
              </div>
            )}

            <span className="hidden text-left font-semibold text-slate-900 md:block">
              {user?.firstName || "System"}
              <br />
              <span className="text-xs font-normal text-slate-500">
                {user?.role || "USER"}
              </span>
            </span>

            <ChevronDown size={18} className="text-slate-500" />
          </button>

          {openMenu && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <User size={18} />
                Profile
              </Link>

              <Link
                to={ROUTES.LOGOUT}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}