import {
  useArchiveSpecialtyMutation,
} from "../../../hooks/admin/useArchiveSpecialtyMutation";

export default function ConfirmArchiveSpecialtyModal({
  open,
  specialty,
  onClose,
}) {
  const archiveSpecialty =
    useArchiveSpecialtyMutation();

  if (!open || !specialty)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6">

        <h2 className="text-xl font-bold">
          Archive Specialty
        </h2>

        <p className="mt-4 text-slate-600">
          Are you sure you want to archive
          {" "}
          <strong>
            {specialty.name}
          </strong>
          ?
        </p>

        <div className="mt-6 flex gap-3">

          <button
            onClick={onClose}
            className="
              flex-1
              rounded-xl
              border
              border-slate-200
              py-3
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              archiveSpecialty.mutate(
                specialty.id,
                {
                  onSuccess: onClose,
                }
              )
            }
            className="
              flex-1
              rounded-xl
              bg-red-600
              py-3
              text-white
            "
          >
            Archive
          </button>

        </div>

      </div>

    </div>
  );
}