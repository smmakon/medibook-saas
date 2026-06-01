import prisma from "../../config/prisma.js";
import {USER_ROLES, USER_STATUS} from "../../constants/users/user.constants.js";
import {APPOINTMENT_STATUS} from "../../constants/appointments/appointment.constants.js"

function throwError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

async function getDoctorIdFromUser(authenticatedUser, doctorIdFromBody = null) {
  if (authenticatedUser.role === USER_ROLES.DOCTOR) {
    if (!authenticatedUser.doctorProfile) {
      throwError("Doctor Profile Not Found", 404);
    }

    return authenticatedUser.doctorProfile.id;
  }

  if (authenticatedUser.role === USER_ROLES.ADMIN) {
    if (!doctorIdFromBody) {
      throwError("Doctor Id Is Required", 400);
    }

    const doctor = await prisma.doctorProfile.findUnique({
      where: { id: doctorIdFromBody },
    });

    if (!doctor) {
      throwError("Doctor Not Found", 404);
    }

    return doctor.id;
  }

  throwError("You Are Not Allowed To Manage Doctor Unavailability", 403);
}

async function checkUnavailabilityOverlap({
  doctorId,
  startDateTime,
  endDateTime,
  excludeId = null,
}) {
  const overlap = await prisma.doctorUnavailability.findFirst({
    where: {
      doctorId,
      ...(excludeId && {
        id: {
          not: excludeId,
        },
      }),
      startDateTime: {
        lt: endDateTime,
      },
      endDateTime: {
        gt: startDateTime,
      },
    },
  });

  if (overlap) {
    throwError("Unavailability Overlaps With Existing Unavailability", 409);
  }
}

async function findImpactedAppointments({ doctorId, startDateTime, endDateTime }) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      status: {
        in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.CONFIRMED],
      },
      startDateTime: {
        lt: endDateTime,
      },
      endDateTime: {
        gt: startDateTime,
      },
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
}

async function notifyImpactedPatients(appointments) {
  if (appointments.length === 0) return;

  await prisma.notification.createMany({
    data: appointments.map((appointment) => ({
      userId: appointment.patient.user.id,
      type: "APPOINTMENT_UPDATE",
      channel: "SYSTEM",
      title: "Appointment May Need Rescheduling",
      message:
        "Your appointment may be affected by a doctor unavailability. Please contact the clinic.",
    })),
  });
}

export async function createDoctorUnavailability({ authenticatedUser, data }) {
  const doctorId = await getDoctorIdFromUser(authenticatedUser, data.doctorId);

  const startDateTime = new Date(data.startDateTime);
  const endDateTime = new Date(data.endDateTime);

  await checkUnavailabilityOverlap({
    doctorId,
    startDateTime,
    endDateTime,
  });

  const impactedAppointments = await findImpactedAppointments({
    doctorId,
    startDateTime,
    endDateTime,
  });

  const unavailability = await prisma.doctorUnavailability.create({
    data: {
      doctorId,
      startDateTime,
      endDateTime,
      reason: data.reason || null,
    },
  });

  await notifyImpactedPatients(impactedAppointments);

  await prisma.activityLog.create({
    data: {
      userId: authenticatedUser.id,
      action: "CREATE_DOCTOR_UNAVAILABILITY",
      entity: "DoctorUnavailability",
      entityId: unavailability.id,
      metadata: {
        doctorId,
        reason: data.reason || null,
        impactedAppointmentsCount: impactedAppointments.length,
      },
    },
  });

  return {
    unavailability,
    impactedAppointmentsCount: impactedAppointments.length,
  };
}

export async function getMyDoctorUnavailabilities(authenticatedUser) {
  if (!authenticatedUser.doctorProfile) {
    throwError("Doctor Profile Not Found", 404);
  }

  return prisma.doctorUnavailability.findMany({
    where: {
      doctorId: authenticatedUser.doctorProfile.id,
    },
    orderBy: {
      startDateTime: "asc",
    },
  });
}

export async function getDoctorUnavailabilities(doctorId) {
  const doctor = await prisma.doctorProfile.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) {
    throwError("Doctor Not Found", 404);
  }

  return prisma.doctorUnavailability.findMany({
    where: {
      doctorId,
    },
    orderBy: {
      startDateTime: "asc",
    },
  });
}

export async function updateDoctorUnavailability({
  authenticatedUser,
  unavailabilityId,
  data,
}) {
  const unavailability = await prisma.doctorUnavailability.findUnique({
    where: { id: unavailabilityId },
  });

  if (!unavailability) {
    throwError("Unavailability Not Found", 404);
  }

  if (
    authenticatedUser.role === "DOCTOR" &&
    unavailability.doctorId !== authenticatedUser.doctorProfile?.id
  ) {
    throwError("You Can Only Update Your Own Unavailability", 403);
  }

  const updatedStartDateTime = data.startDateTime
    ? new Date(data.startDateTime)
    : unavailability.startDateTime;

  const updatedEndDateTime = data.endDateTime
    ? new Date(data.endDateTime)
    : unavailability.endDateTime;

  await checkUnavailabilityOverlap({
    doctorId: unavailability.doctorId,
    startDateTime: updatedStartDateTime,
    endDateTime: updatedEndDateTime,
    excludeId: unavailabilityId,
  });

  const impactedAppointments = await findImpactedAppointments({
    doctorId: unavailability.doctorId,
    startDateTime: updatedStartDateTime,
    endDateTime: updatedEndDateTime,
  });

  const updatedUnavailability = await prisma.doctorUnavailability.update({
    where: { id: unavailabilityId },
    data: {
      startDateTime: updatedStartDateTime,
      endDateTime: updatedEndDateTime,
      reason: data.reason ?? unavailability.reason,
    },
  });

  await notifyImpactedPatients(impactedAppointments);

  await prisma.activityLog.create({
    data: {
      userId: authenticatedUser.id,
      action: "UPDATE_DOCTOR_UNAVAILABILITY",
      entity: "DoctorUnavailability",
      entityId: updatedUnavailability.id,
      metadata: {
        doctorId: unavailability.doctorId,
        impactedAppointmentsCount: impactedAppointments.length,
      },
    },
  });

  return {
    unavailability: updatedUnavailability,
    impactedAppointmentsCount: impactedAppointments.length,
  };
}

export async function deleteDoctorUnavailability({
  authenticatedUser,
  unavailabilityId,
}) {
  const unavailability = await prisma.doctorUnavailability.findUnique({
    where: { id: unavailabilityId },
  });

  if (!unavailability) {
    throwError("Unavailability Not Found", 404);
  }

  if (
    authenticatedUser.role === "DOCTOR" &&
    unavailability.doctorId !== authenticatedUser.doctorProfile?.id
  ) {
    throwError("You Can Only Delete Your Own Unavailability", 403);
  }

  await prisma.activityLog.create({
    data: {
      userId: authenticatedUser.id,
      action: "DELETE_DOCTOR_UNAVAILABILITY",
      entity: "DoctorUnavailability",
      entityId: unavailability.id,
      metadata: {
        doctorId: unavailability.doctorId,
        reason: unavailability.reason,
      },
    },
  });

  return prisma.doctorUnavailability.delete({
    where: { id: unavailabilityId },
  });
}