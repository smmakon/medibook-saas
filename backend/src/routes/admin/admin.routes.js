import express from "express";
import { getAdminDashboardStatsController } from "../../controllers/admin/admin-dashboard.controller.js";
import {authMiddleware,authorizeRoles} from "../../middlewares/auth/auth.middleware.js"
import {USER_ROLES} from "../../constants/users/user.constants.js"
import { getDoctorsController } from "../../controllers/admin/get-doctors.controller.js";
import { getDoctorByIdController } from "../../controllers/admin/get-doctor-by-id.controller.js";
import { updateDoctorController } from "../../controllers/admin/update-doctor.controller.js";
import { updateDoctorStatusController }
from "../../controllers/admin/update-doctor-status.controller.js";

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
  "/doctors/:id",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getDoctorByIdController
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


export default router;