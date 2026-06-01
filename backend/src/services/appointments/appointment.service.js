import prisma from "../../config/prisma.js";
import { checkDoctorAvailability } from "./availability.service.js";
import { checkAppointmentConflict } from "./conflict.service.js";
import { USER_ROLES} from "../../constants/users/user.constants.js"

function getInitialStatus(role) {
  if (role === USER_ROLES.PATIENT) return "PENDING";
  if (role === USER_ROLES.DOCTOR) return "CONFIRMED";
  if (role === USER_ROLES.ADMIN) return "CONFIRMED";

  return "PENDING";
}

async function getPatientId({ authenticatedUser, data }) {
  if (authenticatedUser.role === USER_ROLES.PATIENT) {
    if (!authenticatedUser.patientProfile) {
      const error = new Error("Patient Profile Not Found");
      error.statusCode = 404;
      throw error;
    }

    return authenticatedUser.patientProfile.id;
  }

  const patient = await prisma.patientProfile.findUnique({
    where: { id: data.patientId },
  });

  if (!patient) {
    const error = new Error("Patient Not Found");
    error.statusCode = 404;
    throw error;
  }

  return patient.id;
}

function getDoctorId({ authenticatedUser, data }) {
  if (authenticatedUser.role === USER_ROLES.DOCTOR) {
    if (!authenticatedUser.doctorProfile) {
      const error = new Error("Doctor Profile Not Found");
      error.statusCode = 404;
      throw error;
    }

    if (data.doctorId && data.doctorId !== authenticatedUser.doctorProfile.id) {
      const error = new Error("Doctor Can Only Create Appointments For Himself");
      error.statusCode = 403;
      throw error;
    }

    return authenticatedUser.doctorProfile.id;
  }

  return data.doctorId;
}

export async function createAppointment({ authenticatedUser, data }) {
  const startDateTime = new Date(data.startDateTime);
  const endDateTime = new Date(data.endDateTime);

  const patientId = await getPatientId({ authenticatedUser, data });
  const doctorId = getDoctorId({ authenticatedUser, data });

  await checkDoctorAvailability({
    doctorId,
    startDateTime,
    endDateTime,
  });

  await checkAppointmentConflict({
    doctorId,
    startDateTime,
    endDateTime,
  });

  const status = getInitialStatus(authenticatedUser.role);

  const appointment = await prisma.appointment.create({
    data: {
      patientId,
      doctorId,
      startDateTime,
      endDateTime,
      reason: data.reason,
      status,
    },
    include: {
      patient: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      doctor: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          specialty: true,
        },
      },
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: appointment.patient.user.id,
        type: "APPOINTMENT_CONFIRMATION",
        channel: "SYSTEM",
        title: "Appointment Created",
        message: `Your appointment has been created with status ${status}.`,
      },
      {
        userId: appointment.doctor.user.id,
        type: "APPOINTMENT_CONFIRMATION",
        channel: "SYSTEM",
        title: "New Appointment",
        message: "A new appointment has been created.",
      },
    ],
  });

  await prisma.activityLog.create({
    data: {
      userId: authenticatedUser.id,
      action: "CREATE_APPOINTMENT",
      entity: "Appointment",
      entityId: appointment.id,
      metadata: {
        createdByRole: authenticatedUser.role,
        status,
        patientId,
        doctorId,
      },
    },
  });

  return appointment;
}