import express from "express";

import { registerPatientController } from "../../controllers/auth/register-patient.controller.js";
import { loginController } from "../../controllers/auth/login.controller.js";

import { validateRegisterPatient } from "../../validators/auth/register-patient.validator.js";
import { validateLogin } from "../../validators/auth/login.validator.js";

const router = express.Router();

router.post(
  "/register/patient",
  validateRegisterPatient,
  registerPatientController
);

router.post(
  "/login",
  validateLogin,
  loginController
);

export default router;