import { UserTable } from '@/components/admin/UserTable';

export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all registered users and their plans.
        </p>
      </div>
      <UserTable />
    </div>
  );
}
