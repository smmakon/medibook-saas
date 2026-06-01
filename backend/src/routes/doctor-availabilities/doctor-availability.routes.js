import express from "express";

import {
  authMiddleware,
  authorizeRoles,
} from "../../middlewares/auth/auth.middleware.js";

import {
  createDoctorAvailabilityController,
  getMyDoctorAvailabilitiesController,
  getDoctorAvailabilitiesController,
  updateDoctorAvailabilityController,
  deleteDoctorAvailabilityController,
} from "../../controllers/doctor-availabilities/doctor-availability.controller.js";

import {
  validateCreateDoctorAvailability,
  validateUpdateDoctorAvailability,
} from "../../validators/doctor-availabilities/doctor-availability.validator.js";


import { USER_ROLES } from "../../constants/users/user.constants.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  validateCreateDoctorAvailability,
  createDoctorAvailabilityController
);

router.get(
  "/me",
  authMiddleware,
  authorizeRoles(USER_ROLES.DOCTOR),
  getMyDoctorAvailabilitiesController
);

router.get(
  "/doctor/:doctorId",
  authMiddleware,
  authorizeRoles(USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  getDoctorAvailabilitiesController
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  validateUpdateDoctorAvailability,
  updateDoctorAvailabilityController
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  deleteDoctorAvailabilityController
);

export default router;