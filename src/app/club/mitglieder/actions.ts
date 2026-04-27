"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function togglePaidStatus(memberId: string) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Nicht eingeloggt")

  const currentMember = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (currentMember.length === 0 || currentMember[0].role !== "admin") {
    throw new Error("Keine Berechtigung")
  }

  const target = await db
    .select()
    .from(members)
    .where(eq(members.id, memberId))
    .limit(1)

  if (target.length === 0) throw new Error("Mitglied nicht gefunden")

  const newPaidAt = target[0].paidAt ? null : new Date()

  await db
    .update(members)
    .set({ paidAt: newPaidAt })
    .where(eq(members.id, memberId))

  revalidatePath(`/club/mitglieder/${memberId}`)
  revalidatePath("/club/mitglieder")

  return { success: true, paidAt: newPaidAt?.toISOString() ?? null }
}
