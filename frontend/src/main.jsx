import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3000,

        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },

        style: {
          borderRadius: "12px",
          background: "#fff",
          color: "#0f172a",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        },
      }}
    />
  </StrictMode>
);