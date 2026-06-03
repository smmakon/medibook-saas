import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth/auth.routes.js";
import authAdminRoutes from "./routes/auth/admin.routes.js";

import adminRoutes from "./routes/admin/admin.routes.js";
import appointmentRoutes from "./routes/appointments/appointment.routes.js";
import doctorAvailabilityRoutes from "./routes/doctor-availabilities/doctor-availability.routes.js";
import doctorUnavailabilityRoutes from "./routes/doctor-unavailabilities/doctor-unavailability.routes.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Global middlewares
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Medibook API is running",
    version: "1.0.0",
  });
});

/**
 * API routes
 */
app.use("/api/auth", authRoutes);

// Routes admin liées à l'authentification : création admin / création doctor si déjà là
app.use("/api/auth/admin", authAdminRoutes);

// Routes admin générales : dashboard stats, gestion users, etc.
app.use("/api/admin", adminRoutes);

app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctor-availabilities", doctorAvailabilityRoutes);
app.use("/api/doctor-unavailabilities", doctorUnavailabilityRoutes);

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global error handler
 */
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Medibook API running on http://localhost:${PORT}`);
});