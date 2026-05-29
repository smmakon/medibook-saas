import { loginUser } from "../../services/auth/login.service.js";

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    return res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}