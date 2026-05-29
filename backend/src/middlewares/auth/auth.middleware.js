import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";
import { USER_STATUS } from "../../constants/users/user.constants.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        patientProfile: true,
        doctorProfile: {
          include: {
            specialty: true,
          },
        },
      },
    });

    if (!user || user.status !== USER_STATUS.ACTIVE) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    delete user.password;
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
}