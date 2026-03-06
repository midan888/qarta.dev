import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing the route
vi.mock('@/lib/tenant', () => ({
  requireTenant: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    query: {
      tenants: {
        findFirst: vi.fn(),
      },
    },
  },
}));

import { GET } from '@/app/api/slug/check/route';
import { requireTenant } from '@/lib/tenant';
import { db } from '@/lib/db';

const mockTenant = { id: 'tenant-1', slug: 'my-restaurant', plan: 'free' };

function makeRequest(slug: string) {
  return new Request(`http://localhost/api/slug/check?slug=${encodeURIComponent(slug)}`);
}

beforeEach(() => {
  vi.mocked(requireTenant).mockResolvedValue(mockTenant as never);
  vi.mocked(db.query.tenants.findFirst).mockReset();
  vi.mocked(db.query.tenants.findFirst).mockResolvedValue(undefined);
});

describe('GET /api/slug/check — auth', () => {
  it('returns 401 when not authenticated', async () => {
    vi.mocked(requireTenant).mockRejectedValue(new Error('Unauthorized'));
    const res = await GET(makeRequest('some-slug'));
    expect(res.status).toBe(401);
  });
});

describe('GET /api/slug/check — input validation', () => {
  it('returns 400 when slug param is missing', async () => {
    const req = new Request('http://localhost/api/slug/check');
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it('rejects slugs shorter than 3 characters', async () => {
    const res = await GET(makeRequest('ab'));
    const body = await res.json();
    expect(body.available).toBe(false);
    expect(body.reason).toMatch(/3/);
  });

  it('rejects slugs longer than 60 characters', async () => {
    const slug = 'a'.repeat(61);
    const res = await GET(makeRequest(slug));
    const body = await res.json();
    expect(body.available).toBe(false);
    expect(body.reason).toMatch(/60/);
  });

  it('normalises uppercase to lowercase and treats it as valid', async () => {
    // The route calls .toLowerCase() on the input, so 'MyRestaurant' → 'myrestaurant'
    vi.mocked(db.query.tenants.findFirst).mockResolvedValue(undefined);
    const res = await GET(makeRequest('MyRestaurant'));
    const body = await res.json();
    expect(body.available).toBe(true);
  });

  it('rejects slugs starting with a hyphen', async () => {
    const res = await GET(makeRequest('-my-slug'));
    const body = await res.json();
    expect(body.available).toBe(false);
  });

  it('rejects slugs ending with a hyphen', async () => {
    const res = await GET(makeRequest('my-slug-'));
    const body = await res.json();
    expect(body.available).toBe(false);
  });

  it('rejects slugs with consecutive hyphens', async () => {
    const res = await GET(makeRequest('my--slug'));
    const body = await res.json();
    expect(body.available).toBe(false);
    expect(body.reason).toMatch(/consecutive/i);
  });

  it('rejects slugs with special characters', async () => {
    const res = await GET(makeRequest('my_slug!'));
    const body = await res.json();
    expect(body.available).toBe(false);
  });
});

describe('GET /api/slug/check — reserved slugs', () => {
  const reserved = ['api', 'admin', 'login', 'register', 'settings', 'www', 'menu'];

  for (const slug of reserved) {
    it(`rejects reserved slug "${slug}"`, async () => {
      const res = await GET(makeRequest(slug));
      const body = await res.json();
      expect(body.available).toBe(false);
      expect(body.reason).toMatch(/reserved/i);
    });
  }
});

describe('GET /api/slug/check — availability', () => {
  it("returns available:true with current:true for the tenant's own slug", async () => {
    const res = await GET(makeRequest('my-restaurant')); // same as mockTenant.slug
    const body = await res.json();
    expect(body.available).toBe(true);
    expect(body.current).toBe(true);
  });

  it('returns available:true when slug is not taken', async () => {
    vi.mocked(db.query.tenants.findFirst).mockResolvedValue(undefined);
    const res = await GET(makeRequest('brand-new-slug'));
    const body = await res.json();
    expect(body.available).toBe(true);
    expect(db.query.tenants.findFirst).toHaveBeenCalled();
  });

  it('returns available:false when slug is already taken', async () => {
    vi.mocked(db.query.tenants.findFirst).mockResolvedValue({ id: 'other-tenant' } as never);
    const res = await GET(makeRequest('taken-slug'));
    const body = await res.json();
    expect(body.available).toBe(false);
  });

  it('accepts valid slug with numbers', async () => {
    vi.mocked(db.query.tenants.findFirst).mockResolvedValue(undefined);
    const res = await GET(makeRequest('cafe-123'));
    const body = await res.json();
    expect(body.available).toBe(true);
  });

  it('accepts minimum length slug (3 chars)', async () => {
    vi.mocked(db.query.tenants.findFirst).mockResolvedValue(undefined);
    const res = await GET(makeRequest('abc'));
    const body = await res.json();
    expect(body.available).toBe(true);
  });

  it('accepts maximum length slug (60 chars)', async () => {
    vi.mocked(db.query.tenants.findFirst).mockResolvedValue(undefined);
    const slug = 'a'.repeat(58) + 'bc'; // 60 chars, valid
    const res = await GET(makeRequest(slug));
    const body = await res.json();
    expect(body.available).toBe(true);
  });

  it('does not query the DB for reserved slugs', async () => {
    await GET(makeRequest('admin'));
    expect(db.query.tenants.findFirst).not.toHaveBeenCalled();
  });

  it('does not query the DB for invalid format slugs', async () => {
    await GET(makeRequest('invalid--slug')); // consecutive hyphens — fails before DB
    expect(db.query.tenants.findFirst).not.toHaveBeenCalled();
  });
});
