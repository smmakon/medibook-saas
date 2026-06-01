import prisma from "../../config/prisma.js";

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

function toMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function timeStringToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export async function checkDoctorAvailability({ doctorId, startDateTime, endDateTime }) {
  const doctor = await prisma.doctorProfile.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) {
    const error = new Error("Doctor Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (!doctor.isAvailable) {
    const error = new Error("Doctor Is Not Available");
    error.statusCode = 400;
    throw error;
  }

  const dayOfWeek = DAYS[startDateTime.getDay()];

  const availability = await prisma.doctorAvailability.findFirst({
    where: {
      doctorId,
      dayOfWeek,
      isActive: true,
    },
  });

  if (!availability) {
    const error = new Error("Doctor Has No Availability For This Day");
    error.statusCode = 400;
    throw error;
  }

  const requestedStart = toMinutes(startDateTime);
  const requestedEnd = toMinutes(endDateTime);
  const availableStart = timeStringToMinutes(availability.startTime);
  const availableEnd = timeStringToMinutes(availability.endTime);

  if (requestedStart < availableStart || requestedEnd > availableEnd) {
    const error = new Error("Requested Time Is Outside Doctor Working Hours");
    error.statusCode = 400;
    throw error;
  }

  const unavailability = await prisma.doctorUnavailability.findFirst({
    where: {
      doctorId,
      startDateTime: {
        lt: endDateTime,
      },
      endDateTime: {
        gt: startDateTime,
      },
    },
  });

  if (unavailability) {
    const error = new Error("Doctor Is Unavailable During This Time");
    error.statusCode = 400;
    throw error;
  }

  return true;
}