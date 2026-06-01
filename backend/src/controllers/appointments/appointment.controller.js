import { createAppointment } from "../../services/appointments/appointment.service.js";

export async function createAppointmentController(req, res) {
  try {
    const appointment = await createAppointment({
      authenticatedUser: req.user,
      data: req.body,
    });

    return res.status(201).json({
      message: "Appointment Created Successfully",
      appointment,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message,
    });
  }
}