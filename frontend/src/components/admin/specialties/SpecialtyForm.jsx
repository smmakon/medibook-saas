import { useEffect, useState } from "react";
import { validateSpecialty } from "../../../utils/specialty.validation";

export default function SpecialtyForm({
  specialty,
  onSubmit,
  isPending,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (specialty) {
      setName(specialty.name || "");
      setDescription(
        specialty.description || ""
      );
    } else {
      setName("");
      setDescription("");
    }

    setErrors({});
  }, [specialty]);

  const handleSubmit = () => {
    const validationErrors =
      validateSpecialty({
        name,
        description,
      });

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    onSubmit({
      name: name.trim(),
      description:
        description.trim(),
    });
  };

  return (
    <div className="p-6 space-y-5">

      {/* NAME */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Specialty Name
          <span className="ml-1 text-red-500">
            *
          </span>
        </label>

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            if (errors.name) {
              setErrors((prev) => ({
                ...prev,
                name: undefined,
              }));
            }
          }}
          className={`
            w-full
            rounded-xl
            px-4
            py-3
            border
            ${
              errors.name
                ? "border-red-500"
                : "border-slate-200"
            }
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          `}
          placeholder="Ex: Cardiology"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
          <span className="ml-1 text-red-500">
            *
          </span>
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(
              e.target.value
            );

            if (
              errors.description
            ) {
              setErrors(
                (prev) => ({
                  ...prev,
                  description:
                    undefined,
                })
              );
            }
          }}
          className={`
            w-full
            rounded-xl
            px-4
            py-3
            resize-none
            border
            ${
              errors.description
                ? "border-red-500"
                : "border-slate-200"
            }
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          `}
          placeholder="Describe the specialty..."
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="
          w-full
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          hover:bg-blue-700
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {isPending
          ? "Saving..."
          : specialty
          ? "Update Specialty"
          : "Create Specialty"}
      </button>

    </div>
  );
}