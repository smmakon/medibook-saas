import prisma from "../../config/prisma.js";
import { APPOINTMENT_STATUS } from "../../constants/appointments/appointment.constants.js";

export async function checkAppointmentConflict({
  doctorId,
  startDateTime,
  endDateTime,
  excludeAppointmentId = null,
}) {
  const conflict = await prisma.appointment.findFirst({
    where: {
      doctorId,
      status: {
        in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.CONFIRMED],
      },
      ...(excludeAppointmentId && {
        id: {
          not: excludeAppointmentId,
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

  if (conflict) {
    const error = new Error("Selected Time Slot Is Already Booked");
    error.statusCode = 409;
    throw error;
  }

  return true;
}
