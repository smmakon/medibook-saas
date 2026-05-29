import { registerPatient } from "../../services/auth/register-patient.service.js";

export async function registerPatientController(req, res) {
  try {
    const user = await registerPatient(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}