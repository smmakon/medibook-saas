import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPatient } from "../../services/authService";
import {
  isSameValue,
  isStrongEnoughPassword,
  isValidEmail,
} from "../../utils/validators";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  postalCode: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  insuranceNumber: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export default function RegisterPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
    if (!form.firstName.trim()) {
      return "First name is required";
    }

    if (!form.lastName.trim()) {
      return "Last name is required";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!isValidEmail(form.email)) {
      return "Invalid email format";
    }

    if (!isStrongEnoughPassword(form.password)) {
      return "Password must contain at least 8 characters";
    }

    if (!isSameValue(form.password, form.confirmPassword)) {
      return "Passwords do not match";
    }

    if (!form.acceptTerms) {
      return "You must accept the Terms and Conditions";
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender || null,
        address: form.address.trim() || null,
        city: form.city.trim() || null,
        postalCode: form.postalCode.trim() || null,
        emergencyContactName: form.emergencyContactName.trim() || null,
        emergencyContactPhone: form.emergencyContactPhone.trim() || null,
        insuranceNumber: form.insuranceNumber.trim() || null,
        password: form.password,
      };

      await registerPatient(payload);

      setSuccess("Patient account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(error.message || "Unable to register patient");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-10">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow">
                M
                </div>

                <span className="text-3xl font-bold text-slate-800">
                Medibook
                </span>
            </div>

            {/* Title */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                Create Your Patient Account
                </h1>

                <p className="mt-3 text-slate-500">
                Register to book and manage your medical appointments securely.
                </p>
            </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <input
            className="input"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />

          <input
            className="input"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />

          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="input"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            className="input"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          <select
            className="input"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            className="input md:col-span-2"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            className="input"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <input
            className="input"
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
          />

          <input
            className="input"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            value={form.emergencyContactName}
            onChange={handleChange}
          />

          <input
            className="input"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            value={form.emergencyContactPhone}
            onChange={handleChange}
          />

          <input
            className="input md:col-span-2"
            name="insuranceNumber"
            placeholder="Insurance Number"
            value={form.insuranceNumber}
            onChange={handleChange}
          />

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            className="input"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <label className="flex items-start gap-2 text-sm text-slate-600 md:col-span-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={form.acceptTerms}
              onChange={handleChange}
              className="mt-1"
            />
            <span>
              I accept the Terms and Conditions and Privacy Policy.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </section>
    </main>
  );
}