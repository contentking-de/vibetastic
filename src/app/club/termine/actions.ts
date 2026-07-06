"use server"

import { db } from "@/lib/db"
import { workshopEvents, members } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Nicht eingeloggt")

  const member = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (member.length === 0 || member[0].role !== "admin") {
    throw new Error("Keine Berechtigung")
  }
}

export async function createEvent(formData: FormData) {
  await requireAdmin()

  const title = formData.get("title") as string
  const dateStart = formData.get("dateStart") as string
  const dateEnd = formData.get("dateEnd") as string
  const location = formData.get("location") as string
  const maxSpots = parseInt(formData.get("maxSpots") as string, 10)
  const priceNet = parseInt(formData.get("priceNet") as string, 10)

  if (!title || !dateStart || !dateEnd || !location || !maxSpots || !priceNet) {
    throw new Error("Alle Felder sind Pflicht")
  }

  await db
    .update(workshopEvents)
    .set({ active: false })
    .where(eq(workshopEvents.active, true))

  await db.insert(workshopEvents).values({
    title,
    dateStart: new Date(dateStart),
    dateEnd: new Date(dateEnd),
    location,
    maxSpots,
    priceNet,
    active: true,
  })

  revalidatePath("/club/termine")
}
