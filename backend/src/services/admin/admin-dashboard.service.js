import prisma from "../../config/prisma.js";

export async function getAdminDashboardStats() {
  const [
    totalUsers,
    totalPatients,
    totalDoctors,
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    cancelledAppointments,
    recentUsers,
    recentAppointments,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.patientProfile.count(),

    prisma.doctorProfile.count(),

    prisma.appointment.count(),

    prisma.appointment.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.appointment.count({
      where: {
        status: "CONFIRMED",
      },
    }),

    prisma.appointment.count({
      where: {
        status: "CANCELLED",
      },
    }),

    prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.appointment.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return {
    overview: {
      totalUsers,
      totalPatients,
      totalDoctors,
      totalAppointments,
    },

    appointments: {
      pending: pendingAppointments,
      confirmed: confirmedAppointments,
      cancelled: cancelledAppointments,
    },

    recentUsers,

    recentAppointments,
  };
}