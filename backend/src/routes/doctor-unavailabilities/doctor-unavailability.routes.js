import express from "express";

import {
  authMiddleware,
  authorizeRoles,
} from "../../middlewares/auth/auth.middleware.js";

import {
  createDoctorUnavailabilityController,
  getMyDoctorUnavailabilitiesController,
  getDoctorUnavailabilitiesController,
  updateDoctorUnavailabilityController,
  deleteDoctorUnavailabilityController,
} from "../../controllers/doctor-unavailabilities/doctor-unavailability.controller.js";

import {
  validateCreateDoctorUnavailability,
  validateUpdateDoctorUnavailability,
} from "../../validators/doctor-unavailabilities/doctor-unavailability.validator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("DOCTOR", "ADMIN"),
  validateCreateDoctorUnavailability,
  createDoctorUnavailabilityController
);

router.get(
  "/me",
  authMiddleware,
  authorizeRoles("DOCTOR"),
  getMyDoctorUnavailabilitiesController
);

router.get(
  "/doctor/:doctorId",
  authMiddleware,
  authorizeRoles("PATIENT", "DOCTOR", "ADMIN"),
  getDoctorUnavailabilitiesController
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("DOCTOR", "ADMIN"),
  validateUpdateDoctorUnavailability,
  updateDoctorUnavailabilityController
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("DOCTOR", "ADMIN"),
  deleteDoctorUnavailabilityController
);

export default router;