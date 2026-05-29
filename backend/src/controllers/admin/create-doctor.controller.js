import { createDoctor } from "../../services/admin/create-doctor.service.js";

export async function createDoctorController(req, res) {
  try {
    const doctor = await createDoctor(req.body);

    return res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}