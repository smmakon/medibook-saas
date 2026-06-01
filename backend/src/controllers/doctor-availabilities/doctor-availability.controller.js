import {
  createDoctorAvailability,
  getMyDoctorAvailabilities,
  getDoctorAvailabilities,
  updateDoctorAvailability,
  deleteDoctorAvailability,
} from "../../services/doctor-availabilities/doctor-availability.service.js";

export async function createDoctorAvailabilityController(req, res) {
  try {
    const availability = await createDoctorAvailability({
      authenticatedUser: req.user,
      data: req.body,
    });

    return res.status(201).json({
      message: "Doctor Availability Created Successfully",
      availability,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Create Doctor Availability",
    });
  }
}

export async function getMyDoctorAvailabilitiesController(req, res) {
  try {
    const availabilities = await getMyDoctorAvailabilities(req.user);

    return res.status(200).json({
      message: "Doctor Availabilities Retrieved Successfully",
      availabilities,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Retrieve Doctor Availabilities",
    });
  }
}

export async function getDoctorAvailabilitiesController(req, res) {
  try {
    const availabilities = await getDoctorAvailabilities(req.params.doctorId);

    return res.status(200).json({
      message: "Doctor Availabilities Retrieved Successfully",
      availabilities,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Retrieve Doctor Availabilities",
    });
  }
}

export async function updateDoctorAvailabilityController(req, res) {
  try {
    const availability = await updateDoctorAvailability({
      authenticatedUser: req.user,
      availabilityId: req.params.id,
      data: req.body,
    });

    return res.status(200).json({
      message: "Doctor Availability Updated Successfully",
      availability,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Update Doctor Availability",
    });
  }
}

export async function deleteDoctorAvailabilityController(req, res) {
  try {
    await deleteDoctorAvailability({
      authenticatedUser: req.user,
      availabilityId: req.params.id,
    });

    return res.status(200).json({
      message: "Doctor Availability Deleted Successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Delete Doctor Availability",
    });
  }
}