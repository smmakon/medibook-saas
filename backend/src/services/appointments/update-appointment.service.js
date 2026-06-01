import prisma from "../../config/prisma.js";
import { checkDoctorAvailability } from "./availability.service.js";
import { checkAppointmentConflict } from "./conflict.service.js";
import { APPOINTMENT_STATUS } from "../../constants/appointments/appointment.constants.js";
import { USER_ROLES } from "../../constants/users/user.constants.js"

function throwError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

function canUpdateAppointment({ appointment, authenticatedUser }) {
  if ([APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.CANCELLED, APPOINTMENT_STATUS.NO_SHOW].includes(appointment.status)) {
    throwError("This Appointment Cannot Be Updated", 400);
  }

  if (authenticatedUser.role === USER_ROLES.ADMIN) return true;

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

  throwError("You Are Not Allowed To Update This Appointment", 403);
}

export async function updateAppointment({
  appointmentId,
  authenticatedUser,
  data,
}) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (!appointment) {
    throwError("Appointment Not Found", 404);
  }

  canUpdateAppointment({ appointment, authenticatedUser });

  const newDoctorId = data.doctorId || appointment.doctorId;
  const newStartDateTime = data.startDateTime
    ? new Date(data.startDateTime)
    : appointment.startDateTime;

  const newEndDateTime = data.endDateTime
    ? new Date(data.endDateTime)
    : appointment.endDateTime;

  if (data.startDateTime || data.endDateTime || data.doctorId) {
    await checkDoctorAvailability({
      doctorId: newDoctorId,
      startDateTime: newStartDateTime,
      endDateTime: newEndDateTime,
    });

    await checkAppointmentConflict({
      doctorId: newDoctorId,
      startDateTime: newStartDateTime,
      endDateTime: newEndDateTime,
      excludeAppointmentId: appointmentId,
    });
  }

  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      doctorId: newDoctorId,
      startDateTime: newStartDateTime,
      endDateTime: newEndDateTime,
      reason: data.reason || appointment.reason,
      status:
        authenticatedUser.role === USER_ROLES.PATIENT
          ? APPOINTMENT_STATUS.PENDING
          : appointment.status,
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
          specialty: true,
        },
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: authenticatedUser.id,
      action: "UPDATE_APPOINTMENT",
      entity: "Appointment",
      entityId: updatedAppointment.id,
      metadata: {
        oldStartDateTime: appointment.startDateTime,
        oldEndDateTime: appointment.endDateTime,
        newStartDateTime,
        newEndDateTime,
        oldDoctorId: appointment.doctorId,
        newDoctorId,
      },
    },
  });

  return updatedAppointment;
}

/*
    Had to save the action : UPDATE_APPOINTMENT

            oldStartDateTime
            oldEndDateTime
            newStartDateTime
            newEndDateTime
            oldDoctorId
            newDoctorId
            updatedByRole


    Had eto manage notification to patient and doctor 
    
            Appointment Updated Successfully
            Your Appointment Has Been Rescheduled
            Appointment Updated By Patient
            Appointment Updated By Doctor
            Appointment Updated By Admin

*/