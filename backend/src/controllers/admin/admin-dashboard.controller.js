import { getAdminDashboardStats } from "../../services/admin/admin-dashboard.service.js";

export async function getAdminDashboardStatsController(req, res) {
  try {
    const stats = await getAdminDashboardStats();

    return res.status(200).json({
      message: "Admin Dashboard Stats Retrieved Successfully",
      stats,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Unable To Retrieve Admin Dashboard Stats",
    });
  }
}