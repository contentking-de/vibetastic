import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { signups, workshopEvents } from "@/lib/db/schema"
import { eq, like, and, not } from "drizzle-orm"
import { sql } from "drizzle-orm"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const events = await db
      .select()
      .from(workshopEvents)
      .where(eq(workshopEvents.active, true))
      .limit(1)

    if (events.length === 0) {
      return NextResponse.json({ event: null, taken: 0, remaining: 0 })
    }

    const event = events[0]

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(signups)
      .where(
        and(
          like(signups.ticket, `${event.title}%`),
          not(like(signups.ticket, `Warteliste%`))
        )
      )

    const taken = count ?? 0
    const remaining = Math.max(0, event.maxSpots - taken)

    return NextResponse.json({
      event: {
        title: event.title,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        location: event.location,
        maxSpots: event.maxSpots,
        priceNet: event.priceNet,
      },
      taken,
      remaining,
    }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    })
  } catch (e) {
    console.error("[/api/spots] Error:", e)
    return NextResponse.json({ event: null, taken: 0, remaining: 0 })
  }
}
