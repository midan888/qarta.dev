export default function BillingLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-24 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-56 rounded bg-gray-100" />
        </div>
      </div>
      <div className="rounded-lg bg-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gray-200" />
          <div>
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="mt-1 h-3 w-48 rounded bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border-2 border-gray-200 p-6">
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="mt-3 h-8 w-20 rounded bg-gray-200" />
            <div className="mt-6 space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 w-full rounded bg-gray-100" />
              ))}
            </div>
            <div className="mt-6 h-10 w-full rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
