import { createAppointment } from "../../services/appointments/appointment.service.js";
import { updateAppointment } from "../../services/appointments/update-appointment.service.js";
import { cancelAppointment } from "../../services/appointments/cancellation.service.js";


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

export async function updateAppointmentController(req, res) {
  try {
    const appointment = await updateAppointment({
      appointmentId: req.params.id,
      authenticatedUser: req.user,
      data: req.body,
    });

    return res.status(200).json({
      message: "Appointment Updated Successfully",
      appointment,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Update Appointment",
    });
  }
}


export async function cancelAppointmentController(req, res) {
  try {
    const appointment = await cancelAppointment({
      appointmentId: req.params.id,
      authenticatedUser: req.user,
      reason: req.body.reason,
    });

    return res.status(200).json({
      message: "Appointment Cancelled Successfully",
      appointment,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Cancel Appointment",
    });
  }
}