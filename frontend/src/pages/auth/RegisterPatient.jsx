import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPatient } from "../../services/authService";
import {
  isSameValue,
  isStrongEnoughPassword,
  isValidEmail,
} from "../../utils/validators";
import AuthHeader from "../../components/common/AuthHeader";

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
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    if (!form.email.trim()) return "Email is required";
    if (!isValidEmail(form.email)) return "Invalid email format";
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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-8">
      <div className="absolute left-8 top-36 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        ))}
      </div>

      <div className="absolute right-10 top-72 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        ))}
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center">
        
        <AuthHeader />

        <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <span className="text-4xl">👤</span>
          </div>

          <div className="mb-7 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Create Your Patient Account
            </h2>
            <p className="mt-2 text-slate-500">
              Register to book and manage your medical appointments securely.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              ✅ {success}
            </div>
          )}

              <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      className="input"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      className="input"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      className="input"
                      name="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      className="input"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date Of Birth */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Date Of Birth
                    </label>

                    <input
                      id="dateOfBirth"
                      type="date"
                      className="input"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Gender
                    </label>

                    <select
                      id="gender"
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
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Address
                    </label>

                    <input
                      id="address"
                      className="input"
                      name="address"
                      placeholder="Enter your address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      className="input"
                      name="city"
                      placeholder="Enter your city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      className="input"
                      name="postalCode"
                      placeholder="Enter your postal code"
                      value={form.postalCode}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Emergency Contact Name */}
                  <div>
                    <label
                      htmlFor="emergencyContactName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Emergency Contact Name
                    </label>

                    <input
                      id="emergencyContactName"
                      className="input"
                      name="emergencyContactName"
                      placeholder="Emergency contact name"
                      value={form.emergencyContactName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Emergency Contact Phone */}
                  <div>
                    <label
                      htmlFor="emergencyContactPhone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Emergency Contact Phone
                    </label>

                    <input
                      id="emergencyContactPhone"
                      className="input"
                      name="emergencyContactPhone"
                      placeholder="Emergency contact phone"
                      value={form.emergencyContactPhone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Insurance Number */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="insuranceNumber"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Insurance Number
                    </label>

                    <input
                      id="insuranceNumber"
                      className="input"
                      name="insuranceNumber"
                      placeholder="Enter insurance number"
                      value={form.insuranceNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      className="input"
                      name="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Confirm Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      className="input"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Terms */}
                  <div className="md:col-span-2">
                    <label className="flex items-start gap-3 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={form.acceptTerms}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 accent-blue-600"
                      />

                      <span>
                        I accept the Terms and Conditions and Privacy Policy
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="md:col-span-2 rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          © 2026 Medibook. All rights reserved.
        </p>
      </section>
    </main>
  );
}