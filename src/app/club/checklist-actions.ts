"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members, memberChecklist } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

async function getMemberId(): Promise<string | null> {
  const session = await auth()
  if (!session?.user?.email) return null

  const rows = await db
    .select({ id: members.id })
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  return rows[0]?.id ?? null
}

export async function getCheckedItems(): Promise<string[]> {
  const memberId = await getMemberId()
  if (!memberId) return []

  const rows = await db
    .select({ itemId: memberChecklist.itemId })
    .from(memberChecklist)
    .where(
      and(
        eq(memberChecklist.memberId, memberId),
        eq(memberChecklist.checked, true)
      )
    )

  return rows.map((r) => r.itemId)
}

export async function toggleChecklistItem(
  itemId: string,
  checked: boolean
): Promise<{ ok: boolean }> {
  const memberId = await getMemberId()
  if (!memberId) return { ok: false }

  await db
    .insert(memberChecklist)
    .values({
      memberId,
      itemId,
      checked,
      checkedAt: checked ? new Date() : null,
    })
    .onConflictDoUpdate({
      target: [memberChecklist.memberId, memberChecklist.itemId],
      set: {
        checked,
        checkedAt: checked ? new Date() : null,
      },
    })

  revalidatePath("/club")

  return { ok: true }
}
