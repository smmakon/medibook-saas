import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import DoctorTable from "../../../components/admin/doctors/DoctorTable";
import DoctorModal from "../../../components/admin/doctors/DoctorModal"
import DoctorDetailsModal from "../../../components/admin/doctors/DoctorDetailsModal";
import ConfirmArchiveModal from "../../../components/admin/doctors/ConfirmArchiveModal";
import Pagination from "../../../components/Pagination";

import { useDoctorsQuery } from "../../../hooks/admin/useDoctorsQuery";

export default function DoctorsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");


  const [isDoctorModalOpen, setIsDoctorModalOpen] =
  useState(false);

const [selectedDoctor, setSelectedDoctor] =
  useState(null);

const [isArchiveModalOpen, setIsArchiveModalOpen] =
  useState(false);

const [doctorToArchive, setDoctorToArchive] =
  useState(null);

const [isDetailsModalOpen, setIsDetailsModalOpen] =
  useState(false);


  const {
    data,
    isLoading,
    error,
  } = useDoctorsQuery({
    page,
    search,
  });

  const doctors = data?.data || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">
            Loading doctors...
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
            Unable to load doctors
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

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Manage Doctors
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View, create and manage doctor accounts.
            </p>
          </div>

                  <button
                    onClick={() => {
                      setSelectedDoctor(null);
                      setIsDoctorModalOpen(true);
                    }}
                    className="
                      flex items-center gap-2
                      rounded-xl
                      bg-blue-600
                      px-5
                      py-3
                      text-white
                      hover:bg-blue-700
                    "
                  >
                    <Plus size={18} />
                    Add Doctor
                  </button>

        </div>

      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search doctors..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

              <DoctorTable
              doctors={doctors}
              onEdit={(doctor) => {
                setSelectedDoctor(doctor);
                setIsDoctorModalOpen(true);
              }}
              onView={(doctor) => {
                setSelectedDoctor(doctor);
                setIsDetailsModalOpen(true);
              }}
              onArchive={(doctor) => {
                setDoctorToArchive(doctor);
                setIsArchiveModalOpen(true);
              }}
            />

        <div className="mt-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <DoctorModal
          open={isDoctorModalOpen}
          doctor={selectedDoctor}
          onClose={() =>
            setIsDoctorModalOpen(false)
          }
        />

        <DoctorDetailsModal
          open={isDetailsModalOpen}
          doctor={selectedDoctor}
          onClose={() =>
            setIsDetailsModalOpen(false)
          }
        />

        <ConfirmArchiveModal
          open={isArchiveModalOpen}
          onClose={() =>
            setIsArchiveModalOpen(false)
          }
          doctor={doctorToArchive}
        />
        </div>

      </div>

    </section>
  );
}