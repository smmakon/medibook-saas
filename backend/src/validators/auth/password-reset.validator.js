function createValidationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

export function validateForgotPassword(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next(createValidationError("Email Is Required"));
  }

  next();
}

export function validateResetPassword(req, res, next) {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(
      createValidationError("Password And Confirm Password Are Required")
    );
  }

  if (password.length < 8) {
    return next(
      createValidationError("Password Must Contain At Least 8 Characters")
    );
  }

  if (password !== confirmPassword) {
    return next(createValidationError("Passwords Do Not Match"));
  }

  next();
}