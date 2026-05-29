export function validateRegisterPatient(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message:
        "firstName, lastName, email and password are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters",
    });
  }

  if (
    dateOfBirth &&
    Number.isNaN(new Date(dateOfBirth).getTime())
  ) {
    return res.status(400).json({
      message: "Invalid dateOfBirth",
    });
  }

  next();
}
