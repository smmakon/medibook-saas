import prisma from "../../config/prisma.js";

export async function updateDoctor(
  doctorId,
  data
) {
  const doctor =
    await prisma.doctorProfile.findUnique({
      where: {
        id: doctorId,
      },

      include: {
        user: true,
      },
    });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  await prisma.user.update({
    where: {
      id: doctor.userId,
    },

    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    },
  });

  return prisma.doctorProfile.update({
    where: {
      id: doctorId,
    },

    data: {
      specialtyId: data.specialtyId,
      licenseNumber: data.licenseNumber,
      bio: data.bio,
      consultationFee:
        data.consultationFee || null,
      clinicAddress:
        data.clinicAddress || null,
      yearsOfExperience:
        data.yearsOfExperience || null,
      maxAppointmentsPerDay:
        data.maxAppointmentsPerDay || 20,
    },

    include: {
      user: true,
      specialty: true,
    },
  });
}