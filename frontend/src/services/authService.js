import { API_URL } from "../config/api";

export async function registerPatient(payload) {
  const response = await fetch(`${API_URL}/auth/register/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to register patient");
  }

  return data;
}


export async function loginUser(payload) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to login");
  }

  return data;
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to send reset password link");
  }

  return data;
}

export async function resetPassword({ token, password, confirmPassword }) {
  const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to reset password");
  }

  return data;
}