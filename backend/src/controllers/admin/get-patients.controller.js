import { getPatients } from "../../services/admin/get-patients.service.js";

export async function getPatientsController(req, res) {
  try {
    const patients = await getPatients();

    return res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}