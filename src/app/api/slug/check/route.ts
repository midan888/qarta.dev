import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tenants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { RESERVED_SLUGS } from "@/lib/constants";
import { requireTenant } from "@/lib/tenant";

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

export async function GET(request: Request) {
  try {
    const tenant = await requireTenant();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim().toLowerCase();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (slug.length < 3 || slug.length > 60) {
      return NextResponse.json({
        available: false,
        reason: "Slug must be between 3 and 60 characters",
      });
    }

    if (!SLUG_REGEX.test(slug)) {
      return NextResponse.json({
        available: false,
        reason: "Only lowercase letters, numbers, and hyphens allowed",
      });
    }

    if (slug.includes("--")) {
      return NextResponse.json({
        available: false,
        reason: "Cannot contain consecutive hyphens",
      });
    }

    if (RESERVED_SLUGS.includes(slug)) {
      return NextResponse.json({
        available: false,
        reason: "This slug is reserved",
      });
    }

    // It's the user's own current slug
    if (slug === tenant.slug) {
      return NextResponse.json({ available: true, current: true });
    }

    const existing = await db.query.tenants.findFirst({
      where: eq(tenants.slug, slug),
    });

    return NextResponse.json({ available: !existing });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
