import {
  forgotPasswordService,
  resetPasswordService,
} from "../../services/auth/password-reset.service.js";

export async function forgotPasswordController(req, res) {
  try {
    const result = await forgotPasswordService(req.body.email);

    return res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Process Forgot Password Request",
    });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const result = await resetPasswordService({
      token: req.params.token,
      password: req.body.password,
    });

    return res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message: error.message || "Unable To Reset Password",
    });
  }
}