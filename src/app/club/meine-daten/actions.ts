"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

type AddressData = {
  fullName: string
  company: string
  street: string
  zip: string
  city: string
  country: string
}

export async function updateAddress(data: AddressData, targetMemberId?: string) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Nicht eingeloggt")

  const currentMember = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (currentMember.length === 0) throw new Error("Kein Mitglied")

  const isAdmin = currentMember[0].role === "admin"
  const memberId = targetMemberId && isAdmin ? targetMemberId : currentMember[0].id

  await db
    .update(members)
    .set({
      fullName: data.fullName || null,
      company: data.company || null,
      street: data.street || null,
      zip: data.zip || null,
      city: data.city || null,
      country: data.country || null,
    })
    .where(eq(members.id, memberId))

  return { success: true }
}
