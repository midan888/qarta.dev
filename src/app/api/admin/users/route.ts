import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, tenants } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/admin';
import { eq, ilike, or, sql, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;
  const offset = (page - 1) * limit;

  const searchCondition = search
    ? or(
        ilike(users.email, `%${search}%`),
        ilike(users.name, `%${search}%`),
        ilike(tenants.name, `%${search}%`),
        ilike(tenants.slug, `%${search}%`)
      )
    : undefined;

  const [data, countResult] = await Promise.all([
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        tenantId: tenants.id,
        restaurantName: tenants.name,
        slug: tenants.slug,
        plan: tenants.plan,
        stripeCustomerId: tenants.stripeCustomerId,
        stripeSubscriptionId: tenants.stripeSubscriptionId,
      })
      .from(users)
      .leftJoin(tenants, eq(tenants.ownerId, users.id))
      .where(searchCondition)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .leftJoin(tenants, eq(tenants.ownerId, users.id))
      .where(searchCondition),
  ]);

  return NextResponse.json({
    users: data,
    total: Number(countResult[0].count),
    page,
    totalPages: Math.ceil(Number(countResult[0].count) / limit),
  });
}
