import express from "express";
import { getAdminDashboardStatsController } from "../../controllers/admin/admin-dashboard.controller.js";
import {authMiddleware,authorizeRoles} from "../../middlewares/auth/auth.middleware.js"
import {USER_ROLES} from "../../constants/users/user.constants.js"
import { getDoctorsController } from "../../controllers/admin/get-doctors.controller.js";
import { getPatientsController } from "../../controllers/admin/get-patients.controller.js";
import { getDoctorByIdController } from "../../controllers/admin/get-doctor-by-id.controller.js";
import { updateDoctorController } from "../../controllers/admin/update-doctor.controller.js";
import { updateDoctorStatusController }
from "../../controllers/admin/update-doctor-status.controller.js";
import { createDoctorController } from "../../controllers/admin/create-doctor.controller.js";
import { validateCreateDoctor } from "../../validators/admin/create-doctor.validator.js";

import {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  archiveSpecialty,
} from "../../controllers/admin/specialty.controller.js";



import { validateUpdateDoctor } from "../../validators/admin/update-doctor.validator.js";

const router = express.Router();

router.get(
  "/dashboard/stats",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getAdminDashboardStatsController
);


router.get(
  "/doctors",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getDoctorsController
);


router.get(
  "/patients",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getPatientsController
);


router.get(
  "/doctors/:id",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getDoctorByIdController
);


router.post(
  "/doctors",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  validateCreateDoctor,
  createDoctorController
);


router.put(
  "/doctors/:id",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  validateUpdateDoctor,
  updateDoctorController
);


router.patch(
  "/doctors/:id/status",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  updateDoctorStatusController
);


router.get("/specialties", authMiddleware, authorizeRoles(USER_ROLES.ADMIN), getSpecialties);
router.post("/specialties", authMiddleware, authorizeRoles(USER_ROLES.ADMIN), createSpecialty);
router.patch("/specialties/:id", authMiddleware, authorizeRoles(USER_ROLES.ADMIN), updateSpecialty);
router.delete("/specialties/:id", authMiddleware, authorizeRoles(USER_ROLES.ADMIN), archiveSpecialty);

export default router;