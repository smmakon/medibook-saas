import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { USER_ROLES, USER_STATUS } from "../../constants/users/user.constants.js";

export async function createDoctor(data) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const specialty = await prisma.specialty.findUnique({
    where: { id: data.specialtyId },
  });

  if (!specialty) {
    throw new Error("Specialty not found");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      password: hashedPassword,
      role: USER_ROLES.DOCTOR,
      status: USER_STATUS.ACTIVE,

      doctorProfile: {
        create: {
          specialtyId: data.specialtyId,
          licenseNumber: data.licenseNumber,
          bio: data.bio || null,
          consultationFee: data.consultationFee || null,
          clinicAddress: data.clinicAddress || null,
          yearsOfExperience: data.yearsOfExperience || null,
          isAvailable: true,
        },
      },
    },
    include: {
      doctorProfile: {
        include: {
          specialty: true,
        },
      },
    },
  });

  delete user.password;
  return user;
}