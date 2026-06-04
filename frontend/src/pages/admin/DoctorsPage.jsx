import { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";

import { getDoctors } from "../../services/adminService";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">
          Doctors Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all registered doctors.
        </p>
      </div>

    </section>
  );
}