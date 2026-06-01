import {USER_ROLES} from "../../constants/users/user.constants.js";

function createValidationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function isValidDate(date) {
  return !Number.isNaN(new Date(date).getTime());
}

export function validateCreateDoctorUnavailability(req, res, next) {
  const { doctorId, startDateTime, endDateTime, reason } = req.body;

  if (req.user.role === USER_ROLES.ADMIN && !doctorId) {
    return next(createValidationError("Doctor Id Is Required"));
  }

  if (!startDateTime || !endDateTime) {
    return next(
      createValidationError("Start Date Time And End Date Time Are Required")
    );
  }

  if (!isValidDate(startDateTime) || !isValidDate(endDateTime)) {
    return next(createValidationError("Invalid Date Format"));
  }

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  if (start < new Date()) {
    return next(createValidationError("Start Date Must Be In The Future"));
  }

  if (end <= start) {
    return next(createValidationError("End Date Must Be Greater Than Start Date"));
  }

  if (reason && reason.length > 255) {
    return next(createValidationError("Reason Must Be Less Than 255 Characters"));
  }

  next();
}

export function validateUpdateDoctorUnavailability(req, res, next) {
  const { startDateTime, endDateTime, reason } = req.body;

  if (!startDateTime && !endDateTime && !reason) {
    return next(createValidationError("At Least One Field Is Required"));
  }

  if ((startDateTime && !endDateTime) || (!startDateTime && endDateTime)) {
    return next(
      createValidationError(
        "Start Date Time And End Date Time Must Be Updated Together"
      )
    );
  }

  if (startDateTime && endDateTime) {
    if (!isValidDate(startDateTime) || !isValidDate(endDateTime)) {
      return next(createValidationError("Invalid Date Format"));
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (start < new Date()) {
      return next(createValidationError("Start Date Must Be In The Future"));
    }

    if (end <= start) {
      return next(createValidationError("End Date Must Be Greater Than Start Date"));
    }
  }

  next();
}