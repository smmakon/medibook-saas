import { getDoctorById } from "../../services/admin/get-doctor-by-id.service.js";

export async function getDoctorByIdController(req, res) {
  try {
    const doctor = await getDoctorById(req.params.id);

    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}