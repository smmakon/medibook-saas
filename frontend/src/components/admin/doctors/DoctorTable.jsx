import {
  Eye,
  Pencil,
  Archive
} from "lucide-react";

import Tooltip from "../../common/Tooltip";

export default function DoctorTable({
  doctors,
  onEdit,
  onView,
  onArchive,
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Doctor
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Specialty
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Experience
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Fee
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {doctors.map((doctor) => (
            <tr
              key={doctor.id}
              className="border-t border-slate-100"
            >
              <td className="px-6 py-4">

                <div>

                  <p className="font-semibold text-slate-900">
                    Dr. {doctor.user?.firstName} {doctor.user?.lastName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {doctor.email}
                  </p>

                </div>

              </td>

              <td className="px-6 py-4">
                {doctor.specialty?.name}
              </td>

              <td className="px-6 py-4">
                {doctor.yearsOfExperience} years
              </td>

              <td className="px-6 py-4">
                ${doctor.consultationFee}
              </td>

              <td className="px-6 py-4">

                <span
                  className="
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                  "
                >
                  {doctor.user?.status}
                </span>

              </td>
                  <td className="align-middle">
                  <div className="flex items-center justify-center gap-3">

                  <Tooltip text="Details">
                    <button
                    onClick={() => onView(doctor)}
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Eye size={16} />
                    </button>
                  </Tooltip>

                  <Tooltip text="Edit">
                    <button 
                    onClick={() => onEdit(doctor)}
                    className="p-2 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200">
                      <Pencil size={16} />
                    </button>
                  </Tooltip>

                  <Tooltip text="Archive">
                    <button 
                    onClick={() => onArchive(doctor)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                      <Archive size={16} />
                    </button>
                  </Tooltip>
                </div>
                </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}