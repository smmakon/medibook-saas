import { getDoctors } from "../../services/admin/get-doctors.service.js";

export async function getDoctorsController(req, res) {
  try {
    const doctors = await getDoctors();

    return res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}