'use client';

import { useState, useEffect, useCallback } from 'react';

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  tenantId: string | null;
  restaurantName: string | null;
  slug: string | null;
  plan: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
};

type ApiResponse = {
  users: UserRow[];
  total: number;
  page: number;
  totalPages: number;
};

const planColors: Record<string, string> = {
  free: 'bg-gray-100 text-gray-700',
  pro: 'bg-blue-100 text-blue-700',
  business: 'bg-purple-100 text-purple-700',
};

export function UserTable() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingTenant, setEditingTenant] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set('search', search);
    const res = await fetch(`/api/admin/users?${params}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handlePlanChange(tenantId: string, newPlan: string) {
    setSaving(true);
    await fetch(`/api/admin/users/${tenantId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: newPlan }),
    });
    setSaving(false);
    setEditingTenant(null);
    fetchUsers();
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  }

  return (
    <div>
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by email, name, restaurant, or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* Stats */}
      {data && (
        <p className="mb-4 text-sm text-gray-500">
          {data.total} total user{data.total !== 1 ? 's' : ''}
        </p>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Restaurant</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stripe</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Joined</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">Loading...</td>
              </tr>
            ) : data?.users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">No users found</td>
              </tr>
            ) : (
              data?.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name || '—'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-0.5 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">
                          admin
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {user.tenantId ? (
                      <div>
                        <p className="text-sm text-gray-900">{user.restaurantName}</p>
                        <p className="text-xs text-gray-500">/{user.slug}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No restaurant</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.plan ? (
                      editingTenant === user.tenantId ? (
                        <select
                          defaultValue={user.plan}
                          disabled={saving}
                          onChange={(e) => handlePlanChange(user.tenantId!, e.target.value)}
                          onBlur={() => setEditingTenant(null)}
                          autoFocus
                          className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-gray-900 focus:outline-none"
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="business">Business</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${planColors[user.plan] || planColors.free}`}
                        >
                          {user.plan}
                        </span>
                      )
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.stripeCustomerId ? (
                      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                        connected
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {user.tenantId && (
                      <button
                        onClick={() => setEditingTenant(user.tenantId)}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900"
                      >
                        Change plan
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {data.page} of {data.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
