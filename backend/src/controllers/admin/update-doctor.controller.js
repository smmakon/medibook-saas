import { updateDoctor }
from "../../services/admin/update-doctor.service.js";

export async function updateDoctorController(
  req,
  res
) {
  try {
    const doctor =
      await updateDoctor(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}