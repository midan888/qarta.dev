export default function SettingsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div>
        <div className="h-7 w-32 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-64 rounded bg-gray-100" />
      </div>
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="mt-2 h-10 w-full rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
