import prisma from "../../config/prisma.js";
import { APPOINTMENT_STATUS } from "../../constants/appointments/appointment.constants.js";
import { USER_ROLES } from "../../constants/users/user.constants.js";

function throwError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

function canCancelAppointment({ appointment, authenticatedUser }) {
  if ([APPOINTMENT_STATUS.CANCELLED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.NO_SHOW].includes(appointment.status)) {
    throwError("This Appointment Cannot Be Cancelled", 400);
  }

  if (authenticatedUser.role === USER_ROLES.ADMIN) {
    return true;
  }

  if (
    authenticatedUser.role === USER_ROLES.PATIENT &&
    appointment.patient.userId === authenticatedUser.id
  ) {
    return true;
  }

  if (
    authenticatedUser.role === USER_ROLES.DOCTOR &&
    appointment.doctor.userId === authenticatedUser.id
  ) {
    return true;
  }

  throwError("You Are Not Allowed To Cancel This Appointment", 403);
}

export async function cancelAppointment({
  appointmentId,
  authenticatedUser,
  reason,
}) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      patient: {
        include: {
          user: true,
        },
      },
      doctor: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!appointment) {
    throwError("Appointment Not Found", 404);
  }

  canCancelAppointment({ appointment, authenticatedUser });

  const cancelledAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      status: APPOINTMENT_STATUS.CANCELLED,
      cancellationReason: reason || null,
      cancelledAt: new Date(),
    },
    include: {
      patient: {
        include: {
          user: true,
        },
      },
      doctor: {
        include: {
          user: true,
        },
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: authenticatedUser.id,
      action: "CANCEL_APPOINTMENT",
      entity: "Appointment",
      entityId: appointment.id,
      metadata: {
        cancelledByRole: authenticatedUser.role,
        reason: reason || null,
        oldStatus: appointment.status,
        newStatus: APPOINTMENT_STATUS.CANCELLED,
      },
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: appointment.patient.user.id,
        type: "APPOINTMENT_CANCELLATION",
        channel: "SYSTEM",
        title: "Appointment Cancelled",
        message: "Your appointment has been cancelled.",
      },
      {
        userId: appointment.doctor.user.id,
        type: "APPOINTMENT_CANCELLATION",
        channel: "SYSTEM",
        title: "Appointment Cancelled",
        message: "An appointment has been cancelled.",
      },
    ],
  });

  return cancelledAppointment;
}