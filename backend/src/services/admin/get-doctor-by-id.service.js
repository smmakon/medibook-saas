import prisma from "../../config/prisma.js";

export async function getDoctorById(id) {
  const doctor = await prisma.doctorProfile.findUnique({
    where: {
      id,
    },

    include: {
      user: true,
      specialty: true,
    },
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
}