export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 rounded bg-gray-100" />
        </div>
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>

      {/* Content skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full rounded bg-gray-100" />
            <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />
            <div className="mt-4 h-8 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
