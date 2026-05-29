import { generateToken } from "../../utils/generateToken.js";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { USER_ROLES, USER_STATUS } from "../../constants/users/user.constants.js";

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      patientProfile: true,
      doctorProfile: {
        include: {
          specialty: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== USER_STATUS.ACTIVE) {
    throw new Error("Account is not active");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  delete user.password;

  return {
    token,
    user,
  };
}