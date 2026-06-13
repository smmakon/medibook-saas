export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongEnoughPassword(password) {
  return password && password.length >= 8;
}

export function isSameValue(value1, value2) {
  return value1 === value2;
}


// validations/doctor.validation.js

export function validateDoctor(data) {
  const errors = {};

  if (!data.firstName || data.firstName.length < 2) {
    errors.firstName =
      "First name must be at least 2 characters";
  }

  if (!data.lastName || data.lastName.length < 2) {
    errors.lastName =
      "Last name must be at least 2 characters";
  }

  if (!data.email) {
    errors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Invalid email format";
  }

if (!data.specialtyId) {
  errors.specialtyId = "Specialty is required";
}


  if (!data.licenseNumber || data.licenseNumber.trim().length < 3) {
    errors.licenseNumber = "Licence number is required";
  }

  if (!data.id) {
    // Seulement à la création
    if (!data.password || data.password.length < 8) {
      errors.password = "Password should have at least 8 characters";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password did not match";
    }
  }



  return errors;
}