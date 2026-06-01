import prisma from "../../config/prisma.js";
import { USER_ROLES } from "../../constants/users/user.constants.js";

function throwError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
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

  throwError("You Are Not Allowed To Manage Doctor Availability", 403);
}

async function checkAvailabilityOverlap({
  doctorId,
  dayOfWeek,
  startTime,
  endTime,
  excludeId = null,
}) {
  const existingAvailabilities = await prisma.doctorAvailability.findMany({
    where: {
      doctorId,
      dayOfWeek,
      isActive: true,
      ...(excludeId && {
        id: {
          not: excludeId,
        },
      }),
    },
  });

  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  const hasOverlap = existingAvailabilities.some((availability) => {
    const existingStart = timeToMinutes(availability.startTime);
    const existingEnd = timeToMinutes(availability.endTime);

    return newStart < existingEnd && newEnd > existingStart;
  });

  if (hasOverlap) {
    throwError("Availability Overlaps With Existing Availability", 409);
  }
}

export async function createDoctorAvailability({ authenticatedUser, data }) {
  const doctorId = await getDoctorIdFromUser(authenticatedUser, data.doctorId);

  await checkAvailabilityOverlap({
    doctorId,
    dayOfWeek: data.dayOfWeek,
    startTime: data.startTime,
    endTime: data.endTime,
  });

  return prisma.doctorAvailability.create({
    data: {
      doctorId,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      isActive: true,
    },
  });
}

export async function getMyDoctorAvailabilities(authenticatedUser) {
  if (!authenticatedUser.doctorProfile) {
    throwError("Doctor Profile Not Found", 404);
  }

  return prisma.doctorAvailability.findMany({
    where: {
      doctorId: authenticatedUser.doctorProfile.id,
      isActive: true,
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
}

export async function getDoctorAvailabilities(doctorId) {
  const doctor = await prisma.doctorProfile.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) {
    throwError("Doctor Not Found", 404);
  }

  return prisma.doctorAvailability.findMany({
    where: {
      doctorId,
      isActive: true,
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
}

export async function updateDoctorAvailability({
  authenticatedUser,
  availabilityId,
  data,
}) {
  const availability = await prisma.doctorAvailability.findUnique({
    where: { id: availabilityId },
  });

  if (!availability) {
    throwError("Availability Not Found", 404);
  }

  if (
    authenticatedUser.role === "DOCTOR" &&
    availability.doctorId !== authenticatedUser.doctorProfile?.id
  ) {
    throwError("You Can Only Update Your Own Availability", 403);
  }

  const updatedDayOfWeek = data.dayOfWeek || availability.dayOfWeek;
  const updatedStartTime = data.startTime || availability.startTime;
  const updatedEndTime = data.endTime || availability.endTime;

  await checkAvailabilityOverlap({
    doctorId: availability.doctorId,
    dayOfWeek: updatedDayOfWeek,
    startTime: updatedStartTime,
    endTime: updatedEndTime,
    excludeId: availabilityId,
  });

  return prisma.doctorAvailability.update({
    where: { id: availabilityId },
    data: {
      dayOfWeek: updatedDayOfWeek,
      startTime: updatedStartTime,
      endTime: updatedEndTime,
    },
  });
}

export async function deleteDoctorAvailability({
  authenticatedUser,
  availabilityId,
}) {
  const availability = await prisma.doctorAvailability.findUnique({
    where: { id: availabilityId },
  });

  if (!availability) {
    throwError("Availability Not Found", 404);
  }

  if (
    authenticatedUser.role === USER_ROLES.DOCTOR &&
    availability.doctorId !== authenticatedUser.doctorProfile?.id
  ) {
    throwError("You Can Only Delete Your Own Availability", 403);
  }

  return prisma.doctorAvailability.update({
    where: { id: availabilityId },
    data: {
      isActive: false,
    },
  });
}