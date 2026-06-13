import { Pencil, Archive } from "lucide-react";

export default function SpecialtyTable({
  specialties,
  onEdit,
  onArchive,
}) {
  return (
    <div className="overflow-hidden rounded-2xl">

      <table className="min-w-full">

        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Description
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {specialties.map((specialty) => (
            <tr
              key={specialty.id}
              className="border-t border-slate-100 hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {specialty.name}
              </td>

              <td className="px-6 py-4 text-slate-500">
                {specialty.description || "—"}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">

                  <button
                    onClick={() =>
                      onEdit(specialty)
                    }
                    className="
                      rounded-lg
                      bg-amber-100
                      p-2
                      text-amber-600
                      hover:bg-amber-200
                    "
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      onArchive(specialty)
                    }
                    className="
                      rounded-lg
                      bg-red-100
                      p-2
                      text-red-600
                      hover:bg-red-200
                    "
                  >
                    <Archive size={16} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}