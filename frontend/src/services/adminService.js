import { API_URL } from "../config/api";
import { getToken } from "../config/storage";

export async function getAdminDashboardStats() {
  const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load admin dashboard stats");
  }

  return data.stats;
}