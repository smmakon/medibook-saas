export default function AdminStatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconBgColor = "bg-blue-50",
  iconTextColor = "text-blue-600",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor} ${iconTextColor}`}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}