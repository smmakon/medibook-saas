export function validateSpecialty(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name =
      "Specialty name must contain at least 2 characters";
  }

  if (!data.description || data.description.trim().length < 5) {
    errors.description =
      "Description is required";
  }

  return errors;
}