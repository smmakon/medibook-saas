import { USER_ROLES } from "../../constants/users/user.constants.js";

const validDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

function isValidTimeFormat(time) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function createValidationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

export function validateCreateDoctorAvailability(req, res, next) {
  const { doctorId, dayOfWeek, startTime, endTime } = req.body;

  if (req.user.role === USER_ROLES.ADMIN && !doctorId) {
    return next(createValidationError("Doctor Id Is Required"));
  }

  if (!dayOfWeek) {
    return next(createValidationError("Day Of Week Is Required"));
  }

  if (!validDays.includes(dayOfWeek)) {
    return next(createValidationError("Invalid Day Of Week"));
  }

  if (!startTime || !endTime) {
    return next(createValidationError("Start Time And End Time Are Required"));
  }

  if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
    return next(createValidationError("Invalid Time Format. Expected HH:mm"));
  }

  if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
    return next(createValidationError("Start Time Must Be Before End Time"));
  }

  next();
}

export function validateUpdateDoctorAvailability(req, res, next) {
  const { dayOfWeek, startTime, endTime } = req.body;

  if (dayOfWeek && !validDays.includes(dayOfWeek)) {
    return next(createValidationError("Invalid Day Of Week"));
  }

  if (startTime && !isValidTimeFormat(startTime)) {
    return next(createValidationError("Invalid Start Time Format. Expected HH:mm"));
  }

  if (endTime && !isValidTimeFormat(endTime)) {
    return next(createValidationError("Invalid End Time Format. Expected HH:mm"));
  }

  if (startTime && endTime && timeToMinutes(startTime) >= timeToMinutes(endTime)) {
    return next(createValidationError("Start Time Must Be Before End Time"));
  }

  next();
}