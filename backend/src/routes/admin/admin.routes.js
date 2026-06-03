import express from "express";
import { getAdminDashboardStatsController } from "../../controllers/admin/admin-dashboard.controller.js";
import {authMiddleware,authorizeRoles} from "../../middlewares/auth/auth.middleware.js"
import {USER_ROLES} from "../../constants/users/user.constants.js"


const router = express.Router();

router.get(
  "/dashboard/stats",
  authMiddleware,
  authorizeRoles(USER_ROLES.ADMIN),
  getAdminDashboardStatsController
);


export default router;