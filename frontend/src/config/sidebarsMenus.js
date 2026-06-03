import {
  Home,
  Users,
  Stethoscope,
  Shield,
  Calendar,
  Clock,
  CalendarX,
  BriefcaseMedical,
  Settings,
  User,
  FileText,
  ClipboardList,
} from "lucide-react";

import { ROUTES } from "../routes/routes";

export function getSidebarMenuItems(role) {
  if (role === "ADMIN") {
    return [
      {
        group: null,
        items: [
          {
            label: "Dashboard",
            path: ROUTES.ADMIN_DASHBOARD,
            icon: Home,
          },
        ],
      },
      {
        group: "User Management",
        items: [
          {
            label: "Users",
            path: "/admin/users",
            icon: Users,
          },
          {
            label: "Doctors",
            path: "/admin/doctors",
            icon: Stethoscope,
          },
          {
            label: "Administrators",
            path: "/admin/administrators",
            icon: Shield,
          },
        ],
      },
      {
        group: "Appointment Management",
        items: [
          {
            label: "Appointments",
            path: "/admin/appointments",
            icon: Calendar,
          },
          {
            label: "Availabilities",
            path: "/admin/availabilities",
            icon: Clock,
          },
          {
            label: "Unavailabilities",
            path: "/admin/unavailabilities",
            icon: CalendarX,
          },
        ],
      },
      {
        group: "Medical Data",
        items: [
          {
            label: "Specialties",
            path: "/admin/specialties",
            icon: BriefcaseMedical,
          },
        ],
      },
      {
        group: "System",
        items: [
          {
            label: "Settings",
            path: "/admin/settings",
            icon: Settings,
          },
        ],
      },
    ];
  }

  if (role === "DOCTOR") {
    return [
      {
        group: null,
        items: [
          {
            label: "Dashboard",
            path: ROUTES.DOCTOR_DASHBOARD,
            icon: Home,
          },
        ],
      },
      {
        group: "Appointments",
        items: [
          {
            label: "My Appointments",
            path: "/doctor/appointments",
            icon: Calendar,
          },
          {
            label: "Patients",
            path: "/doctor/patients",
            icon: Users,
          },
        ],
      },
      {
        group: "Schedule Management",
        items: [
          {
            label: "Availabilities",
            path: "/doctor/availabilities",
            icon: Clock,
          },
          {
            label: "Unavailabilities",
            path: "/doctor/unavailabilities",
            icon: CalendarX,
          },
        ],
      },
      {
        group: "Account",
        items: [
          {
            label: "Profile",
            path: "/doctor/profile",
            icon: User,
          },
        ],
      },
    ];
  }

  if (role === "PATIENT") {
    return [
      {
        group: null,
        items: [
          {
            label: "Dashboard",
            path: ROUTES.PATIENT_DASHBOARD,
            icon: Home,
          },
        ],
      },
      {
        group: "Appointments",
        items: [
          {
            label: "Book Appointment",
            path: "/patient/book-appointment",
            icon: Calendar,
          },
          {
            label: "My Appointments",
            path: "/patient/appointments",
            icon: ClipboardList,
          },
          {
            label: "History",
            path: "/patient/history",
            icon: Clock,
          },
        ],
      },
      {
        group: "Medical Data",
        items: [
          {
            label: "Medical Records",
            path: "/patient/medical-records",
            icon: FileText,
          },
        ],
      },
      {
        group: "Account",
        items: [
          {
            label: "Profile",
            path: "/patient/profile",
            icon: User,
          },
        ],
      },
    ];
  }

  return [];
}