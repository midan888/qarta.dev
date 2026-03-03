import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tenants } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';
import type { PlanType } from '@/lib/constants';

const VALID_PLANS: PlanType[] = ['free', 'pro', 'business'];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: tenantId } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};

  if (body.plan && VALID_PLANS.includes(body.plan)) {
    updates.plan = body.plan;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  updates.updatedAt = new Date();

  await db.update(tenants).set(updates).where(eq(tenants.id, tenantId));

  return NextResponse.json({ success: true });
}
