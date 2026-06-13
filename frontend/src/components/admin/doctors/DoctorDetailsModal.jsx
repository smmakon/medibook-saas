import { X, Stethoscope, Mail, Phone, FileText, DollarSign, Clock } from "lucide-react";

export default function DoctorDetailsModal({ open, doctor, onClose }) {
  if (!open || !doctor) return null;

  const statusColor = {
    ACTIVE: "bg-green-100 text-green-700",
    SUSPENDED: "bg-orange-100 text-orange-700",
    INACTIVE: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Dr. {doctor.user?.firstName} {doctor.user?.lastName}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {doctor.specialty?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusColor[doctor.user?.status] || statusColor.INACTIVE
              }`}
            >
              {doctor.user?.status}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <DetailRow icon={<Mail size={16} />} label="Email" value={doctor.user?.email} />
          <DetailRow icon={<Phone size={16} />} label="Phone number" value={doctor.user?.phone || "—"} />
          <DetailRow icon={<Stethoscope size={16} />} label="Specialty" value={doctor.specialty?.name} />
          <DetailRow icon={<FileText size={16} />} label="Licence Number" value={doctor.licenseNumber} />
          <DetailRow
            icon={<DollarSign size={16} />}
            label="Fee"
            value={doctor.consultationFee ? `$${doctor.consultationFee}` : "—"}
          />
          <DetailRow
            icon={<Clock size={16} />}
            label="Experience"
            value={doctor.yearsOfExperience ? `${doctor.yearsOfExperience} ans` : "—"}
          />

          {doctor.bio && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Biographie
              </p>
              <p className="text-sm text-slate-600">{doctor.bio}</p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 text-sm"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}