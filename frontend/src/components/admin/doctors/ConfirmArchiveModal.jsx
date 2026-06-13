import { useArchiveDoctorMutation } from "../../../hooks/admin/useArchiveDoctorMutation";

export default function ConfirmArchiveModal({ open, onClose, doctor }) {
  const archiveDoctor = useArchiveDoctorMutation();

  if (!open || !doctor) return null;

  const handleConfirm = () => {
    archiveDoctor.mutate(doctor.id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-xl">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          Archiver ce médecin ?
        </h2>
        <p className="text-slate-500 text-sm mb-2">
          Dr. {doctor.user?.firstName} {doctor.user?.lastName}
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Cette action va désactiver le compte. Le médecin ne pourra plus se connecter.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={archiveDoctor.isPending}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={archiveDoctor.isPending}
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {archiveDoctor.isPending ? "Archivage..." : "Archiver"}
          </button>
        </div>
      </div>
    </div>
  );
}