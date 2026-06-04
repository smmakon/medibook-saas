export function validateUpdateDoctor(
  req,
  res,
  next
) {
  const {
    firstName,
    lastName,
    specialtyId,
    licenseNumber,
  } = req.body;

  if (!firstName?.trim()) {
    return res.status(400).json({
      message: "First name is required",
    });
  }

  if (!lastName?.trim()) {
    return res.status(400).json({
      message: "Last name is required",
    });
  }

  if (!specialtyId?.trim()) {
    return res.status(400).json({
      message: "Specialty is required",
    });
  }

  if (!licenseNumber?.trim()) {
    return res.status(400).json({
      message: "License number is required",
    });
  }

  next();
}