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