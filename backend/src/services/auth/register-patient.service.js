import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { USER_ROLES, USER_STATUS } from "../../constants/users/user.constants.js";

export async function registerPatient(data) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      password: hashedPassword,
      role: USER_ROLES.PATIENT,
      status: USER_STATUS.ACTIVE,

      patientProfile: {
        create: {
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          gender: data.gender || null,
          address: data.address || null,
          city: data.city || null,
          postalCode: data.postalCode || null,
          emergencyContactName: data.emergencyContactName || null,
          emergencyContactPhone: data.emergencyContactPhone || null,
          insuranceNumber: data.insuranceNumber || null,
        },
      },
    },
    include: {
      patientProfile: true,
    },
  });

  delete user.password;
  return user;
}