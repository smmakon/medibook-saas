import SpecialtyForm from "./SpecialtyForm";

export default function SpecialtyModal({
  open,
  specialty,
  onClose,
  onSubmit,
  isPending,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-white
          shadow-xl
        "
      >
        <div className="border-b p-6">
          <h2 className="text-xl font-bold">

            {specialty
              ? "Update Specialty"
              : "Create Specialty"}

          </h2>
        </div>

        <SpecialtyForm
          specialty={specialty}
          onSubmit={onSubmit}
          isPending={isPending}
        />

        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              py-3
            "
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}