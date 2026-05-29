export function validateCreateDoctor(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    password,
    specialtyId,
    licenseNumber,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !specialtyId || !licenseNumber) {
    return res.status(400).json({
      message:
        "firstName, lastName, email, password, specialtyId and licenseNumber are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must contain at least 8 characters",
    });
  }

  next();
}