import express from "express";
import { USER_ROLES } from "../../constants/users/user.constants.js";

import { authMiddleware, authorizeRoles } from "../../middlewares/auth/auth.middleware.js";
import { createAppointmentController,updateAppointmentController, cancelAppointmentController  } from "../../controllers/appointments/appointment.controller.js";
import { validateCreateAppointment, validateUpdateAppointment } from "../../validators/appointments/appointment.validator.js";


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

router.patch(
  "/:id/cancel",
  authMiddleware,
  authorizeRoles("PATIENT", "DOCTOR", "ADMIN"),
  cancelAppointmentController
);

export default router;