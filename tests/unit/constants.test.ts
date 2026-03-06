import { describe, it, expect } from 'vitest';
import {
  PLAN_LIMITS,
  RESERVED_SLUGS,
  SUPPORTED_LANGUAGES,
  SUPPORTED_CURRENCIES,
  BADGES,
  ALLERGENS,
  THEMES,
} from '@/lib/constants';

describe('PLAN_LIMITS', () => {
  it('free plan is the most restrictive', () => {
    expect(PLAN_LIMITS.free.maxMenus).toBeLessThan(PLAN_LIMITS.pro.maxMenus);
    expect(PLAN_LIMITS.free.maxItemImages).toBeLessThan(PLAN_LIMITS.pro.maxItemImages);
    expect(PLAN_LIMITS.free.maxAiUploads).toBeLessThan(PLAN_LIMITS.pro.maxAiUploads);
  });

  it('free plan disables premium features', () => {
    expect(PLAN_LIMITS.free.customDomain).toBe(false);
    expect(PLAN_LIMITS.free.removeBranding).toBe(false);
  });

  it('pro and business plans enable premium features', () => {
    expect(PLAN_LIMITS.pro.customDomain).toBe(true);
    expect(PLAN_LIMITS.pro.removeBranding).toBe(true);
    expect(PLAN_LIMITS.business.customDomain).toBe(true);
    expect(PLAN_LIMITS.business.removeBranding).toBe(true);
  });

  it('business plan has unlimited menus, images, and AI uploads', () => {
    expect(PLAN_LIMITS.business.maxMenus).toBe(Infinity);
    expect(PLAN_LIMITS.business.maxItemImages).toBe(Infinity);
    expect(PLAN_LIMITS.business.maxAiUploads).toBe(Infinity);
  });

  it('pro plan has unlimited AI uploads', () => {
    expect(PLAN_LIMITS.pro.maxAiUploads).toBe(Infinity);
  });

  it('free plan allows only 1 AI upload', () => {
    expect(PLAN_LIMITS.free.maxAiUploads).toBe(1);
  });
});

describe('RESERVED_SLUGS', () => {
  it('contains critical system routes', () => {
    const critical = ['api', 'admin', 'login', 'register', 'settings'];
    for (const slug of critical) {
      expect(RESERVED_SLUGS).toContain(slug);
    }
  });

  it('has no duplicates', () => {
    const unique = new Set(RESERVED_SLUGS);
    expect(unique.size).toBe(RESERVED_SLUGS.length);
  });

  it('contains only lowercase slugs', () => {
    for (const slug of RESERVED_SLUGS) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });
});

describe('SUPPORTED_LANGUAGES', () => {
  it('includes English', () => {
    const en = SUPPORTED_LANGUAGES.find((l) => l.code === 'en');
    expect(en).toBeDefined();
    expect(en?.name).toBe('English');
  });

  it('all entries have required fields', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.code).toBeTruthy();
      expect(lang.name).toBeTruthy();
      expect(lang.nativeName).toBeTruthy();
    }
  });

  it('has no duplicate language codes', () => {
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    const unique = new Set(codes);
    expect(unique.size).toBe(codes.length);
  });
});

describe('SUPPORTED_CURRENCIES', () => {
  it('includes major currencies', () => {
    const codes = SUPPORTED_CURRENCIES.map((c) => c.code);
    expect(codes).toContain('USD');
    expect(codes).toContain('EUR');
    expect(codes).toContain('GBP');
  });

  it('all entries have code, name, and symbol', () => {
    for (const currency of SUPPORTED_CURRENCIES) {
      expect(currency.code).toBeTruthy();
      expect(currency.name).toBeTruthy();
      expect(currency.symbol).toBeTruthy();
    }
  });

  it('has no duplicate currency codes', () => {
    const codes = SUPPORTED_CURRENCIES.map((c) => c.code);
    const unique = new Set(codes);
    expect(unique.size).toBe(codes.length);
  });
});

describe('BADGES', () => {
  it('contains expected dietary badges', () => {
    expect(BADGES).toContain('vegan');
    expect(BADGES).toContain('vegetarian');
    expect(BADGES).toContain('gluten-free');
    expect(BADGES).toContain('spicy');
  });

  it('has no duplicates', () => {
    const unique = new Set(BADGES);
    expect(unique.size).toBe(BADGES.length);
  });
});

describe('ALLERGENS', () => {
  it('contains common allergens', () => {
    expect(ALLERGENS).toContain('gluten');
    expect(ALLERGENS).toContain('dairy');
    expect(ALLERGENS).toContain('nuts');
  });

  it('has no duplicates', () => {
    const unique = new Set(ALLERGENS);
    expect(unique.size).toBe(ALLERGENS.length);
  });
});

describe('THEMES', () => {
  it('has 10 themes', () => {
    expect(THEMES).toHaveLength(10);
  });

  it('all themes have id, name, and description', () => {
    for (const theme of THEMES) {
      expect(theme.id).toBeTruthy();
      expect(theme.name).toBeTruthy();
      expect(theme.description).toBeTruthy();
    }
  });

  it('has no duplicate theme ids', () => {
    const ids = THEMES.map((t) => t.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
