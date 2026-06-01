import {USER_STATUS, USER_ROLES} from  '../../constants/users/user.constants.js'

export function validateCreateAppointment(req, res, next) {
  const { doctorId, patientId, startDateTime, endDateTime, reason } = req.body;
  const userRole = req.user.role;

  if (!doctorId && userRole !== USER_ROLES.DOCTOR) {
    return res.status(400).json({
      message: "Doctor Id Is Required",
    });
  }

  if ((userRole === USER_ROLES.DOCTOR || userRole === USER_ROLES.ADMIN) && !patientId) {
    return res.status(400).json({
      message: "Patient Id Is Required",
    });
  }

  if (!startDateTime || !endDateTime) {
    return res.status(400).json({
      message: "Start Date Time And End Date Time Are Required",
    });
  }

  if (!reason) {
    return res.status(400).json({
      message: "Reason Is Required",
    });
  }

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return res.status(400).json({
      message: "Invalid Appointment Date",
    });
  }

  if (start < new Date()) {
    return res.status(400).json({
      message: "Start Date Must Be In The Future",
    });
  }

  if (end <= start) {
    return res.status(400).json({
      message: "End Date Must Be Greater Than Start Date",
    });
  }

  next();
}

export function validateUpdateAppointment(req, res, next) {
  const { doctorId, startDateTime, endDateTime, reason } = req.body;

  if (!doctorId && !startDateTime && !endDateTime && !reason) {
    return res.status(400).json({
      message: "At Least One Field Is Required",
    });
  }

  if ((startDateTime && !endDateTime) || (!startDateTime && endDateTime)) {
    return res.status(400).json({
      message: "Start Date Time And End Date Time Must Be Updated Together",
    });
  }

  if (startDateTime && endDateTime) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({
        message: "Invalid Appointment Date",
      });
    }

    if (start < new Date()) {
      return res.status(400).json({
        message: "Start Date Must Be In The Future",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        message: "End Date Must Be Greater Than Start Date",
      });
    }
  }

  next();
}