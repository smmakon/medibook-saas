import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPatient from "../pages/auth/RegisterPatient";
import Login from "../pages/auth/Login";
import PatientDashboard from "../pages/dashboards/PatientDashboard";
import DoctorDashboard from "../pages/dashboards/DoctorDashboard";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetNewPassword from "../pages/auth/SetNewPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/login" element={<Login />} />

        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password/:token" element={<SetNewPassword />} />
        
      </Routes>
    </BrowserRouter>
  );
}