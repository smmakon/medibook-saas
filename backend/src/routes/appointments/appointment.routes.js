import express from "express";
import { USER_ROLES } from "../../constants/users/user.constants.js";

import { authMiddleware, authorizeRoles } from "../../middlewares/auth/auth.middleware.js";
import { createAppointmentController } from "../../controllers/appointments/appointment.controller.js";
import { validateCreateAppointment } from "../../validators/appointments/appointment.validator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  validateCreateAppointment,
  createAppointmentController
);

export default router;