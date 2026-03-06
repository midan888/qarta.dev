import { describe, it, expect, beforeEach, vi } from 'vitest';

// The rate-limit module uses a module-level Map store, so we need to re-import
// it fresh for each test to avoid state leaking between tests.
// We achieve this by mocking Date.now and reimporting within tests.

describe('rateLimit', () => {
  let rateLimit: (key: string, opts: { limit: number; windowSecs: number }) => {
    allowed: boolean;
    remaining: number;
    resetAt: number;
  };

  beforeEach(async () => {
    // Clear module cache so the store Map resets between tests
    vi.resetModules();
    const mod = await import('@/lib/rate-limit');
    rateLimit = mod.rateLimit;
  });

  it('allows the first request', () => {
    const result = rateLimit('ip-1', { limit: 5, windowSecs: 60 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('decrements remaining on each request', () => {
    rateLimit('ip-2', { limit: 3, windowSecs: 60 });
    const result = rateLimit('ip-2', { limit: 3, windowSecs: 60 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(1);
  });

  it('blocks requests over the limit', () => {
    const key = 'ip-3';
    const opts = { limit: 2, windowSecs: 60 };
    rateLimit(key, opts); // 1
    rateLimit(key, opts); // 2
    const result = rateLimit(key, opts); // 3 — over limit
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('returns remaining: 0 when exactly at limit', () => {
    const key = 'ip-4';
    const opts = { limit: 1, windowSecs: 60 };
    const result = rateLimit(key, opts); // count = 1, limit = 1
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it('resets after window expires', () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);

    const key = 'ip-5';
    const opts = { limit: 1, windowSecs: 60 };
    rateLimit(key, opts); // use up the limit
    const blocked = rateLimit(key, opts);
    expect(blocked.allowed).toBe(false);

    // Advance time past the window
    vi.spyOn(Date, 'now').mockReturnValue(now + 61_000);
    const result = rateLimit(key, opts);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(0);

    vi.restoreAllMocks();
  });

  it('tracks different keys independently', () => {
    const opts = { limit: 1, windowSecs: 60 };
    rateLimit('key-a', opts); // exhaust key-a
    const blocked = rateLimit('key-a', opts);
    const allowed = rateLimit('key-b', opts);
    expect(blocked.allowed).toBe(false);
    expect(allowed.allowed).toBe(true);
  });

  it('resetAt is in the future', () => {
    const before = Date.now();
    const result = rateLimit('ip-6', { limit: 5, windowSecs: 30 });
    expect(result.resetAt).toBeGreaterThan(before);
    expect(result.resetAt).toBeLessThanOrEqual(before + 30_000 + 50); // small tolerance
  });
});
