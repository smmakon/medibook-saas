import express from "express";
import { USER_ROLES } from "../../constants/users/user.constants.js";

import { authMiddleware, authorizeRoles } from "../../middlewares/auth/auth.middleware.js";
import { createAppointmentController } from "../../controllers/appointments/appointment.controller.js";
import { validateCreateAppointment } from "../../validators/appointments/appointment.validator.js";
import { updateAppointmentController } from "../../controllers/appointments/appointment.controller.js";
import { validateUpdateAppointment } from "../../validators/appointments/appointment.validator.js";



const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  validateCreateAppointment,
  createAppointmentController
);

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles(USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  validateUpdateAppointment,
  updateAppointmentController
);

export default router;