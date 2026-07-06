import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { workshopEvents, members, signups } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { eq, desc, like, and, not, sql } from "drizzle-orm"
import { createEvent } from "./actions"

export default async function TerminePage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const member = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (member.length === 0 || member[0].role !== "admin") {
    redirect("/club")
  }

  const events = await db
    .select()
    .from(workshopEvents)
    .orderBy(desc(workshopEvents.createdAt))

  const eventsWithCounts = await Promise.all(
    events.map(async (event) => {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(signups)
        .where(
          and(
            like(signups.ticket, `${event.title}%`),
            not(like(signups.ticket, `Warteliste%`))
          )
        )
      return { ...event, signupCount: count ?? 0 }
    })
  )

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-ink mb-1">Workshop-Termine</h1>
        <p className="text-ink-soft text-sm">
          Lege neue Termine an. Der aktive Termin wird auf der Startseite angezeigt.
        </p>
      </div>

      {/* Neuen Termin anlegen */}
      <form action={createEvent} className="bg-bg-card border border-line rounded-xl p-6 space-y-4 max-w-lg">
        <h2 className="font-semibold text-ink text-lg">Neuen Termin anlegen</h2>
        <p className="text-xs text-ink-mute">
          Beim Anlegen wird der bisherige aktive Termin deaktiviert und die Startseite wechselt zum neuen Buchungsmodus.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-ink-soft mb-1">Titel *</label>
            <input
              name="title"
              required
              placeholder="z.B. Workshop #03"
              className="w-full px-3 py-2 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1">Start (Anreise) *</label>
            <input
              name="dateStart"
              type="datetime-local"
              required
              className="w-full px-3 py-2 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1">Ende (Abreise) *</label>
            <input
              name="dateEnd"
              type="datetime-local"
              required
              className="w-full px-3 py-2 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-ink-soft mb-1">Ort *</label>
            <input
              name="location"
              required
              placeholder="z.B. Contentking Agentur, Markdorf"
              className="w-full px-3 py-2 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1">Max. Plätze *</label>
            <input
              name="maxSpots"
              type="number"
              required
              defaultValue={7}
              min={1}
              className="w-full px-3 py-2 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-soft mb-1">Preis netto (EUR) *</label>
            <input
              name="priceNet"
              type="number"
              required
              defaultValue={1950}
              min={0}
              className="w-full px-3 py-2 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-accent text-accent-ink rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Termin anlegen & aktivieren
        </button>
      </form>

      {/* Bisherige Termine */}
      {eventsWithCounts.length > 0 && (
        <div>
          <h2 className="font-semibold text-ink text-lg mb-4">Alle Termine</h2>
          <div className="border border-line rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-bg-soft text-ink-mute text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Titel</th>
                  <th className="text-left px-4 py-3">Zeitraum</th>
                  <th className="text-left px-4 py-3">Ort</th>
                  <th className="text-center px-4 py-3">Plätze</th>
                  <th className="text-center px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {eventsWithCounts.map((ev) => (
                  <tr key={ev.id} className={ev.active ? "bg-accent/5" : ""}>
                    <td className="px-4 py-3 font-medium text-ink">{ev.title}</td>
                    <td className="px-4 py-3 text-ink-soft">
                      {new Date(ev.dateStart).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}
                      {" – "}
                      {new Date(ev.dateEnd).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{ev.location}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={ev.signupCount >= ev.maxSpots ? "text-red-500 font-medium" : "text-ink"}>
                        {ev.signupCount} / {ev.maxSpots}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {ev.active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Aktiv
                        </span>
                      ) : (
                        <span className="text-xs text-ink-mute">Inaktiv</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
