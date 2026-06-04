import { updateDoctorStatus }
from "../../services/admin/update-doctor-status.service.js";

export async function updateDoctorStatusController(
  req,
  res
) {
  try {
    const user =
      await updateDoctorStatus(
        req.params.id,
        req.body.status
      );

    return res.status(200).json({
      success: true,
      message:
        "Doctor status updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}