import {
  Eye,
  Pencil,
  Archive
} from "lucide-react";

import Tooltip from "../../common/Tooltip";

export default function PatientTable({
  patients,
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
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Joined Date
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t border-slate-100"
            >
              <td className="px-6 py-4">

                  <p className="font-semibold text-slate-900">
                     {patient.user?.firstName} {patient.user?.lastName}
                  </p>

              </td>

              <td className="px-6 py-4">
                {patient.user?.email}
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
                  {patient.user?.status}
                </span>

              </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                {new Date(patient.createdAt).toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
                </td>

                  <td className="align-middle">
                  <div className="flex items-center justify-center gap-3">

                  <Tooltip text="Details">
                    <button
                    // onClick={() => onView(patient)}
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Eye size={16} />
                    </button>
                  </Tooltip>

                  <Tooltip text="Edit">
                    <button 
                    // // onClick={() => onEdit(patient)}
                    className="p-2 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200">
                      <Pencil size={16} />
                    </button>
                  </Tooltip>

                  <Tooltip text="Archive">
                    <button 
                    // onClick={() => onArchive(doctor)}
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