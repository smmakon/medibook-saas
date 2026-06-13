import { useState } from "react";
import { Plus } from "lucide-react";

import Pagination from "../../../components/Pagination";

import SpecialtyTable from "../../../components/admin/specialties/SpecialtyTable";
import SpecialtyModal from "../../../components/admin/specialties/SpecialtyModal";
import ConfirmArchiveSpecialtyModal from "../../../components/admin/specialties/ConfirmArchiveSpecialtyModal";

import { useSpecialtiesQuery } from "../../../hooks/admin/useSpecialtiesQuery";

import { useCreateSpecialtyMutation } from "../../../hooks/admin/useCreateSpecialtyMutation";
import { useUpdateSpecialtyMutation } from "../../../hooks/admin/useUpdateSpecialtyMutation";

export default function SpecialtiesPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [
    isSpecialtyModalOpen,
    setIsSpecialtyModalOpen,
  ] = useState(false);

  const [
    selectedSpecialty,
    setSelectedSpecialty,
  ] = useState(null);

  const [
    isArchiveModalOpen,
    setIsArchiveModalOpen,
  ] = useState(false);

  const [
    specialtyToArchive,
    setSpecialtyToArchive,
  ] = useState(null);

  const {
    data,
    isLoading,
    error,
  } = useSpecialtiesQuery({
    page,
    search,
  });



  const createSpecialty =
    useCreateSpecialtyMutation();

  const updateSpecialty =
    useUpdateSpecialtyMutation();

  const specialties = data || [];

  const totalPages =
    data?.totalPages || 1;

  const handleSubmit = (
    formData
  ) => {
    if (selectedSpecialty) {
      updateSpecialty.mutate(
        {
          id:
            selectedSpecialty.id,
          data: formData,
        },
        {
          onSuccess: () => {
            setIsSpecialtyModalOpen(
              false
            );
          },
        }
      );
    } else {
      createSpecialty.mutate(
        formData,
        {
          onSuccess: () => {
            setIsSpecialtyModalOpen(
              false
            );
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">
            Loading specialties...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-bold text-red-700">
            Unable to load specialties
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error.message}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">

      {/* HEADER */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Manage Specialties
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create and manage medical specialties.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedSpecialty(
                null
              );

              setIsSpecialtyModalOpen(
                true
              );
            }}
            className="
              flex items-center gap-2
              rounded-xl
              bg-blue-600
              px-5 py-3
              text-white
              hover:bg-blue-700
            "
          >
            <Plus size={18} />
            Add Specialty
          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );

            setPage(1);
          }}
          placeholder="Search specialties..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            px-4 py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* TABLE */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <SpecialtyTable
          specialties={
            specialties
          }
          onEdit={(
            specialty
          ) => {
            setSelectedSpecialty(
              specialty
            );

            setIsSpecialtyModalOpen(
              true
            );
          }}
          onArchive={(
            specialty
          ) => {
            setSpecialtyToArchive(
              specialty
            );

            setIsArchiveModalOpen(
              true
            );
          }}
        />

        <div className="mt-6">

          <Pagination
            page={page}
            totalPages={
              totalPages
            }
            onPageChange={
              setPage
            }
          />

        </div>

      </div>

      <SpecialtyModal
        open={
          isSpecialtyModalOpen
        }
        specialty={
          selectedSpecialty
        }
        onClose={() =>
          setIsSpecialtyModalOpen(
            false
          )
        }
        onSubmit={
          handleSubmit
        }
        isPending={
          createSpecialty.isPending ||
          updateSpecialty.isPending
        }
      />

      <ConfirmArchiveSpecialtyModal
        open={
          isArchiveModalOpen
        }
        specialty={
          specialtyToArchive
        }
        onClose={() =>
          setIsArchiveModalOpen(
            false
          )
        }
      />

    </section>
  );
}