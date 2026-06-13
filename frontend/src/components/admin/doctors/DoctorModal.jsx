// components/admin/doctors/DoctorModal.jsx

import { X } from "lucide-react";
import DoctorForm from "./DoctorForm";

export default function DoctorModal({
  open,
  onClose,
  doctor = null,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-5xl
          rounded-3xl
          bg-white
          shadow-xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              {doctor
                ? "Edit Doctor"
                : "Create Doctor"}
            </h2>

            <p className="text-slate-500">
              {doctor
                ? "Update doctor information"
                : "Create a new doctor account"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>

        </div>

        <DoctorForm
          doctor={doctor}
          onClose={onClose}
        />

      </div>
    </div>
  );
}