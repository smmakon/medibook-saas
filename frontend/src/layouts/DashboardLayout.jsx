import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col bg-slate-50">
        <DashboardTopbar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 px-4 pb-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}