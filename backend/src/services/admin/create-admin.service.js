import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { USER_ROLES, USER_STATUS } from "../../constants/users/user.constants.js";

export async function createAdmin(data) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      password: hashedPassword,
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ACTIVE,
    },
  });

  delete admin.password;
  return admin;
}