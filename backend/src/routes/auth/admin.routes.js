import express from "express";

import { authMiddleware, authorizeRoles } from "../../middlewares/auth/auth.middleware.js";
import { USER_ROLES } from "../../constants/users/user.constants.js";

import { createDoctorController } from "../../controllers/admin/create-doctor.controller.js";
import { createAdminController } from "../../controllers/admin/create-admin.controller.js";

import { validateCreateDoctor } from "../../validators/admin/create-doctor.validator.js";
import { validateCreateAdmin } from "../../validators/admin/create-admin.validator.js";

const router = express.Router();

router.post(
  "/doctors",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  validateCreateDoctor,
  createDoctorController
);

router.post(
  "/users/admin",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  validateCreateAdmin,
  createAdminController
);

export default router;