export default function MenuLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-36 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-56 rounded bg-gray-100" />
        </div>
        <div className="h-10 w-28 rounded-lg bg-gray-200" />
      </div>

      {/* Menu tabs */}
      <div className="flex gap-2">
        <div className="h-9 w-24 rounded-lg bg-gray-200" />
        <div className="h-9 w-24 rounded-lg bg-gray-100" />
      </div>

      {/* Category skeletons */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-8 w-20 rounded bg-gray-100" />
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
              >
                <div className="h-12 w-12 rounded-lg bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="mt-1 h-3 w-48 rounded bg-gray-100" />
                </div>
                <div className="h-4 w-12 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
