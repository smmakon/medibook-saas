import { Link, useLocation } from "react-router-dom";
import { LogOut, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";
import { getSidebarMenuItems } from "../../config/sidebarsMenus";

export default function DashboardSidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = getSidebarMenuItems(user?.role);

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
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">Medibook</h1>
              <p className="text-sm text-slate-500">SaaS Medical</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

                  <nav className="flex-1 overflow-y-auto">
                      {menuItems.map((section, index) => (
                        <div key={index} className="mb-6">
                          {section.group && (
                            <h3 className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                              {section.group}
                            </h3>
                          )}

                          <div className="space-y-1">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              const isActive = location.pathname === item.path;

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
                                  <Icon size={20} />
                                  <span>{item.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </nav>

        <div className="border-t border-slate-200 pt-6">
          <Link
            to={ROUTES.LOGOUT}
            onClick={onClose}
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