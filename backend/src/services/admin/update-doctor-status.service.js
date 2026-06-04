import prisma from "../../config/prisma.js";

export async function updateDoctorStatus(
  doctorId,
  status
) {
  const doctor =
    await prisma.doctorProfile.findUnique({
      where: {
        id: doctorId,
      },
    });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return prisma.user.update({
    where: {
      id: doctor.userId,
    },

    data: {
      status,
    },
  });
}