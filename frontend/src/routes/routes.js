export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  SET_NEW_PASSWORD: "/set-new-password/:token",

  LOGOUT: "/logout",
  UNAUTHORIZED: "/unauthorized",

  PATIENT_DASHBOARD: "/patient/dashboard",
  DOCTOR_DASHBOARD: "/doctor/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",


  // Doctors Management
  ADMIN_DOCTORS: "/admin/doctors",
  ADMIN_PATIENTS : "/admin/patients",
  ADMIN_CREATE_DOCTOR: "/admin/doctors",
  ADMIN_EDIT_DOCTOR: "/admin/doctors/edit/:id",
  ADMIN_DOCTOR_DETAILS: "/admin/doctors/:id",

  // Specialties
  ADMIN_SPECIALTIES: "/admin/specialties",
};