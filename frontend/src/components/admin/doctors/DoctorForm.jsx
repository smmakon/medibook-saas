import { useEffect, useState } from "react";
import {
  User, Mail, Phone, Lock, UserPlus, Stethoscope,
  FileText, DollarSign, Clock, BookOpen,
} from "lucide-react";

import { validateDoctor } from "../../../utils/validators";
import { useCreateDoctorMutation } from "../../../hooks/admin/useCreateDoctorMutation";
import { useSpecialtiesQuery } from "../../../hooks/admin/useSpecialtiesQuery";
import { useUpdateDoctorMutation } from "../../../hooks/admin/useUpdateDoctorMutation";

export default function DoctorForm({ doctor = null, onClose }) {

  console.log("DoctorForm render");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialtyId: "",
    licenseNumber: "",
    bio: "",
    consultationFee: "",
    yearsOfExperience: "",
    password: "",
    confirmPassword: "",
  });

  
    const {
      data,
      isLoading: specialtiesLoading,
    } = useSpecialtiesQuery();

    console.log("SPECIALTIES RESPONSE:", data);

    const specialties = data || [];

  const createDoctor = useCreateDoctorMutation();
  const updateDoctor = useUpdateDoctorMutation();

  useEffect(() => {
    if (doctor) {
      setFormData({
        firstName: doctor.user?.firstName || "",
        lastName: doctor.user?.lastName || "",
        email: doctor.user?.email || "",
        phone: doctor.user?.phone || "",
        specialtyId: doctor.specialtyId || "",
        licenseNumber: doctor.licenseNumber || "",
        bio: doctor.bio || "",
        consultationFee: doctor.consultationFee || "",
        yearsOfExperience: doctor.yearsOfExperience || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [doctor]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Efface l'erreur du champ dès que l'utilisateur tape
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
    const handleSubmit = () => {
      const dataToValidate = {
        ...formData,
        id: doctor?.id,
      };

      const validationErrors =
        validateDoctor(dataToValidate);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const payload = {
        ...formData,

        consultationFee:
          formData.consultationFee === ""
            ? null
            : Number(formData.consultationFee),

        yearsOfExperience:
          formData.yearsOfExperience === ""
            ? null
            : Number(formData.yearsOfExperience),
      };

      if (doctor) {
        updateDoctor.mutate(
          {
            id: doctor.id,
            data: payload,
          },
          {
            onSuccess: () => onClose(),
          }
        );
      } else {
        createDoctor.mutate(payload, {
          onSuccess: () => onClose(),
        });
      }
    };

  const isPending = createDoctor.isPending || updateDoctor.isPending;

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      {/* Section : Informations personnelles */}
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Personal Informations 
      </h3>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <InputField
          icon={<User size={18} />}
          label="Prénom"
          value={formData.firstName}
          error={errors.firstName}
          onChange={(v) => handleChange("firstName", v)}
        />
        <InputField
          icon={<User size={18} />}
          label="Nom"
          value={formData.lastName}
          error={errors.lastName}
          onChange={(v) => handleChange("lastName", v)}
        />
        <InputField
          icon={<Mail size={18} />}
          label="Email"
          type="email"
          value={formData.email}
          error={errors.email}
          onChange={(v) => handleChange("email", v)}
        />
        <InputField
          icon={<Phone size={18} />}
          label="Téléphone"
          value={formData.phone}
          error={errors.phone}
          onChange={(v) => handleChange("phone", v)}
        />
      </div>

      {/* Section : Informations médicales */}
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Informations médicales
      </h3>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <SelectField
          icon={<Stethoscope size={18} />}
          label="Spécialité"
          value={formData.specialtyId}
          options={specialties}
          error={errors.specialtyId}
          loading={specialtiesLoading}
          onChange={(v) => handleChange("specialtyId", v)}
        />
        <InputField
          icon={<FileText size={18} />}
          label="Numéro de licence"
          value={formData.licenseNumber}
          error={errors.licenseNumber}
          onChange={(v) => handleChange("licenseNumber", v)}
        />
        <InputField
          icon={<DollarSign size={18} />}
          label="Honoraires ($)"
          type="number"
          value={formData.consultationFee}
          error={errors.consultationFee}
          onChange={(v) => handleChange("consultationFee", v)}
        />
        <InputField
          icon={<Clock size={18} />}
          label="Années d'expérience"
          type="number"
          value={formData.yearsOfExperience}
          error={errors.yearsOfExperience}
          onChange={(v) => handleChange("yearsOfExperience", v)}
        />
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Biography
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-slate-400">
            <BookOpen size={18} />
          </div>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Décrivez le parcours du médecin..."
          />
        </div>
      </div>

      {/* Mot de passe — uniquement à la création */}
      {!doctor && (
        <>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Password
          </h3>
          <div className="grid grid-cols-2 gap-5 mb-6">
            <InputField
              icon={<Lock size={18} />}
              label="Mot de passe"
              type="password"
              value={formData.password}
              error={errors.password}
              onChange={(v) => handleChange("password", v)}
            />
            <InputField
              icon={<Lock size={18} />}
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
            />
          </div>
        </>
      )}

      {/* Bouton submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        <UserPlus size={18} />
        {isPending
          ? "Enregistrement..."
          : doctor
          ? "Mettre à jour le médecin"
          : "Créer le médecin"}
      </button>
    </div>
  );
}

function SelectField({ label, icon, value, onChange, options, error, loading }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3.5 text-slate-400">{icon}</div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">
            {loading ? "Chargement..." : "Sélectionner une spécialité"}
          </option>
          {options.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function InputField({ label, icon, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3.5 text-slate-400">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}