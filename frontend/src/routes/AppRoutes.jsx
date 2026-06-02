import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RegisterPatient from "../pages/auth/RegisterPatient";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetNewPassword from "../pages/auth/SetNewPassword";
import Logout from "../pages/auth/Logout";
import Unauthorized from "../pages/auth/Unauthorized";

import PatientDashboard from "../pages/dashboards/PatientDashboard";
import DoctorDashboard from "../pages/dashboards/DoctorDashboard";
import AdminDashboard from "../pages/dashboards/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import { ROUTES } from "../routes/routes";

import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPatient />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path="/set-new-password/:token" element={<SetNewPassword />} />
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

        {/* Protected routes */}
        
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.LOGOUT} element={<Logout />} />

            <Route element={<DashboardLayout />}>
              <Route element={<RoleBasedRoute allowedRoles={["PATIENT"]} />}>
                <Route
                  path={ROUTES.PATIENT_DASHBOARD}
                  element={<PatientDashboard />}
                />
              </Route>

              <Route element={<RoleBasedRoute allowedRoles={["DOCTOR"]} />}>
                <Route
                  path={ROUTES.DOCTOR_DASHBOARD}
                  element={<DoctorDashboard />}
                />
              </Route>

              <Route element={<RoleBasedRoute allowedRoles={["ADMIN"]} />}>
                <Route
                  path={ROUTES.ADMIN_DASHBOARD}
                  element={<AdminDashboard />}
                />
              </Route>
            </Route>
          </Route>


      </Routes>
    </BrowserRouter>
  );
}