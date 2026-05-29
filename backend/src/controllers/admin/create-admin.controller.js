import { createAdmin } from "../../services/admin/create-admin.service.js";

export async function createAdminController(req, res) {
  try {
    const admin = await createAdmin(req.body);

    return res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}