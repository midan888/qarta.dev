import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tenants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireTenant } from "@/lib/tenant";
import { RESERVED_SLUGS } from "@/lib/constants";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  try {
    await requireTenant();
    const { slug, restaurantName } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Generate 5 alternative URL slugs for a restaurant menu page. The desired slug "${slug}" is already taken.${restaurantName ? ` The restaurant is called "${restaurantName}".` : ""}

Rules:
- Only lowercase letters, numbers, and hyphens
- Must start and end with a letter or number
- Between 3 and 60 characters
- No consecutive hyphens
- Make them creative, memorable, and related to the original slug or restaurant name
- Keep them short and clean

Return ONLY a JSON array of 5 strings, no explanation. Example: ["slug-one","slug-two","slug-three","slug-four","slug-five"]`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    let suggestions: string[];
    try {
      suggestions = JSON.parse(text);
    } catch {
      return NextResponse.json({ suggestions: [] });
    }

    // Filter out any that are taken or reserved
    const available: string[] = [];
    for (const s of suggestions) {
      if (
        typeof s !== "string" ||
        s.length < 3 ||
        s.length > 60 ||
        RESERVED_SLUGS.includes(s)
      ) {
        continue;
      }
      const existing = await db.query.tenants.findFirst({
        where: eq(tenants.slug, s),
      });
      if (!existing) {
        available.push(s);
      }
    }

    return NextResponse.json({ suggestions: available });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
