import {
  createDoctorUnavailability,
  getMyDoctorUnavailabilities,
  getDoctorUnavailabilities,
  updateDoctorUnavailability,
  deleteDoctorUnavailability,
} from "../../services/doctor-unavailabilities/doctor-unavailability.service.js";

export async function createDoctorUnavailabilityController(req, res) {
  try {
    const result = await createDoctorUnavailability({
      authenticatedUser: req.user,
      data: req.body,
    });

    return res.status(201).json({
      message: "Doctor Unavailability Created Successfully",
      ...result,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Create Doctor Unavailability",
    });
  }
}

export async function getMyDoctorUnavailabilitiesController(req, res) {
  try {
    const unavailabilities = await getMyDoctorUnavailabilities(req.user);

    return res.status(200).json({
      message: "Doctor Unavailabilities Retrieved Successfully",
      unavailabilities,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Retrieve Doctor Unavailabilities",
    });
  }
}

export async function getDoctorUnavailabilitiesController(req, res) {
  try {
    const unavailabilities = await getDoctorUnavailabilities(req.params.doctorId);

    return res.status(200).json({
      message: "Doctor Unavailabilities Retrieved Successfully",
      unavailabilities,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Retrieve Doctor Unavailabilities",
    });
  }
}

export async function updateDoctorUnavailabilityController(req, res) {
  try {
    const result = await updateDoctorUnavailability({
      authenticatedUser: req.user,
      unavailabilityId: req.params.id,
      data: req.body,
    });

    return res.status(200).json({
      message: "Doctor Unavailability Updated Successfully",
      ...result,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Update Doctor Unavailability",
    });
  }
}

export async function deleteDoctorUnavailabilityController(req, res) {
  try {
    await deleteDoctorUnavailability({
      authenticatedUser: req.user,
      unavailabilityId: req.params.id,
    });

    return res.status(200).json({
      message: "Doctor Unavailability Deleted Successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Delete Doctor Unavailability",
    });
  }
}