import { useEffect, useState } from "react";
import {
  Calendar,
  CalendarDays,
  CalendarClock,
  CheckCircle,
  Clock,
  Stethoscope,
  UserPlus,
  Users,
  ShieldPlus,
  Settings,
  XCircle,
} from "lucide-react";

import AdminStatsCard from "../../components/admin/AdminStatsCard";
import AdminQuickActionCard from "../../components/admin/AdminQuickActionCard";
import { getAdminDashboardStats } from "../../services/adminService";

const quickActions = [
  {
    title: "Manage Doctors",
    description: "View doctors, create doctor accounts and manage specialties.",
    path: "/admin/doctors",
    icon: Stethoscope,
  },
  {
    title: "Manage Users",
    description: "View patients, doctors and administrators.",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Manage Appointments",
    description: "Monitor bookings, cancellations and appointment statuses.",
    path: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Manage Specialties",
    description: "Create and update medical specialties.",
    path: "/admin/specialties",
    icon: Settings,
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboardStats() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminDashboardStats();
      setStats(data);
    } catch (error) {
      setError(error.message || "Unable to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardStats();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Loading admin dashboard...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-bold text-red-700">Unable to load dashboard</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            onClick={loadDashboardStats}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

          const overviewCards = [
          {
            title: "Total Users",
            value: stats?.overview?.totalUsers || 0,
            description: "Registered users",
            icon: Users,
            iconBgColor: "bg-blue-50",
            iconTextColor: "text-blue-600",
          },

          {
            title: "Doctors",
            value: stats?.overview?.totalDoctors || 0,
            description: "Healthcare providers",
            icon: Stethoscope,
            iconBgColor: "bg-emerald-50",
            iconTextColor: "text-emerald-600",
          },

          {
            title: "Patients",
            value: stats?.overview?.totalPatients || 0,
            description: "Registered patients",
            icon: Users,
            iconBgColor: "bg-violet-50",
            iconTextColor: "text-violet-600",
          },

          {
            title: "Appointments",
            value: stats?.overview?.totalAppointments || 0,
            description: "Total appointments",
            icon: CalendarDays,
            iconBgColor: "bg-amber-50",
            iconTextColor: "text-amber-600",
          },
          {
            title: "Today's Appointments",
            value: stats?.overview?.totalAppointments || 0,
            description: "Total appointments",
            icon: CalendarClock,
            iconBgColor: "bg-amber-50",
            iconTextColor: "text-amber-600",
          },
        ];
        const appointmentCards = [
          {
            title: "Pending",
            value: stats?.appointments?.pending || 0,
            description: "Waiting confirmation",
            icon: Clock,
            iconBgColor: "bg-orange-50",
            iconTextColor: "text-orange-600",
          },

          {
            title: "Confirmed",
            value: stats?.appointments?.confirmed || 0,
            description: "Confirmed appointments",
            icon: CheckCircle,
            iconBgColor: "bg-green-50",
            iconTextColor: "text-green-600",
          },

          {
            title: "Cancelled",
            value: stats?.appointments?.cancelled || 0,
            description: "Cancelled appointments",
            icon: XCircle,
            iconBgColor: "bg-red-50",
            iconTextColor: "text-red-600",
          },
        ];

  return (
    <section className="space-y-8">
      
       <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, System Administrator
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor users, doctors, appointments and platform activity from one place.
          </p>
        </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Key Metrics
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((stat) => (
              <AdminStatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
              iconTextColor={stat.iconTextColor}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Appointment Status
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {appointmentCards.map((stat) => (
            <AdminStatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
              iconTextColor={stat.iconTextColor}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Recent Users</h2>

          <div className="mt-5 space-y-4">
            {stats?.recentUsers?.length > 0 ? (
              stats.recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Created on {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No recent users found.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Appointments
          </h2>

          <div className="mt-5 space-y-4">
            {stats?.recentAppointments?.length > 0 ? (
              stats.recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      {appointment.patient?.user?.firstName}{" "}
                      {appointment.patient?.user?.lastName}
                    </p>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {appointment.status}
                    </span>
                  </div>

                      <p className="mt-1 text-sm text-slate-500">
                            Doctor: {appointment.doctor?.user?.firstName}{" "}
                            {appointment.doctor?.user?.lastName}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {new Date(appointment.startDateTime).toLocaleDateString()} at{" "}
                            {new Date(appointment.startDateTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                    </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No recent appointments found.
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>

        <p className="mt-1 text-sm text-slate-500">
          Access the most important administrative actions quickly.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <AdminQuickActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              path={action.path}
              icon={action.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}