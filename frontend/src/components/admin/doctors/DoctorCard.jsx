import { Stethoscope } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <div>

          <h3 className="font-bold text-lg">
            Dr. {doctor.firstName} {doctor.lastName}
          </h3>

          <p className="text-slate-500">
            {doctor.specialty}
          </p>

        </div>

        <div className="bg-blue-50 p-3 rounded-xl">
          <Stethoscope className="text-blue-600" />
        </div>

      </div>

      <div className="mt-4 text-sm space-y-1">

        <p>Email : {doctor.email}</p>

        <p>
          Experience :
          {doctor.yearsOfExperience} years
        </p>

        <p>
          Fee :
          ${doctor.consultationFee}
        </p>

      </div>

    </div>
  );
}