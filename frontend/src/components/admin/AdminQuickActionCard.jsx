import { Link } from "react-router-dom";

export default function AdminQuickActionCard({
  title,
  description,
  path,
  icon: Icon,
}) {
  return (
    <Link
      to={path}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={24} />
      </div>

      <h3 className="text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </Link>
  );
}