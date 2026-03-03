import { NextResponse } from "next/server";
import { requireTenant } from "@/lib/tenant";
import { db } from "@/lib/db";
import { tenants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { RESERVED_SLUGS } from "@/lib/constants";

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

export async function GET() {
  try {
    const tenant = await requireTenant();
    return NextResponse.json(tenant);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const tenant = await requireTenant();
    const body = await request.json();

    // Only allow updating specific fields
    const allowedFields: Record<string, unknown> = {};
    const editableKeys = [
      "name",
      "slug",
      "description",
      "logoUrl",
      "coverImageUrl",
      "address",
      "phone",
      "website",
      "openingHours",
      "themeId",
      "accentColor",
      "defaultLanguage",
      "enabledLanguages",
      "defaultCurrency",
      "enabledCurrencies",
    ];

    for (const key of editableKeys) {
      if (key in body) {
        allowedFields[key] = body[key];
      }
    }

    // Validate slug if being changed
    if ("slug" in allowedFields && allowedFields.slug !== tenant.slug) {
      const slug = String(allowedFields.slug).trim().toLowerCase();
      if (slug.length < 3 || slug.length > 60) {
        return NextResponse.json(
          { error: "Slug must be between 3 and 60 characters" },
          { status: 400 }
        );
      }
      if (!SLUG_REGEX.test(slug) || slug.includes("--")) {
        return NextResponse.json(
          { error: "Slug can only contain lowercase letters, numbers, and hyphens" },
          { status: 400 }
        );
      }
      if (RESERVED_SLUGS.includes(slug)) {
        return NextResponse.json(
          { error: "This slug is reserved" },
          { status: 400 }
        );
      }
      const existing = await db.query.tenants.findFirst({
        where: eq(tenants.slug, slug),
      });
      if (existing) {
        return NextResponse.json(
          { error: "This slug is already taken" },
          { status: 409 }
        );
      }
      allowedFields.slug = slug;
    }

    if (Object.keys(allowedFields).length === 0) {
      return NextResponse.json({ error: "No valid fields" }, { status: 400 });
    }

    allowedFields.updatedAt = new Date();

    const [updated] = await db
      .update(tenants)
      .set(allowedFields)
      .where(eq(tenants.id, tenant.id))
      .returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
