import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { signups, members } from "@/lib/db/schema"
import { eq, desc, inArray } from "drizzle-orm"
import Link from "next/link"

export default async function SignupsPage() {
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

  const rows = await db
    .select()
    .from(signups)
    .orderBy(desc(signups.createdAt))

  const signupEmails = rows.map((r) => r.email)
  const confirmedMembers = signupEmails.length > 0
    ? await db.select({ email: members.email }).from(members).where(inArray(members.email, signupEmails))
    : []
  const confirmedSet = new Set(confirmedMembers.map((m) => m.email))

  return (
    <div>
      <div className="mb-8">
        <p className="label-meta mb-2">Admin</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-ink">
          Anmeldungen
        </h1>
        <p className="mt-3 text-ink-soft">
          {rows.length === 0
            ? "Noch keine Anmeldungen eingegangen."
            : `${rows.length} Anmeldung${rows.length === 1 ? "" : "en"} insgesamt, davon ${confirmedSet.size} bestätigt.`}
        </p>
      </div>

      {rows.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-3 px-4 font-medium text-ink-mute">Status</th>
                <th className="text-left py-3 px-4 font-medium text-ink-mute">Name</th>
                <th className="text-left py-3 px-4 font-medium text-ink-mute">E-Mail</th>
                <th className="text-left py-3 px-4 font-medium text-ink-mute">Ticket</th>
                <th className="text-left py-3 px-4 font-medium text-ink-mute">Projekt</th>
                <th className="text-left py-3 px-4 font-medium text-ink-mute">Datum</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isConfirmed = confirmedSet.has(row.email)
                return (
                  <tr key={row.id} className="border-b border-line/50 last:border-0 hover:bg-bg-soft transition-colors">
                    <td className="py-3 px-4">
                      {isConfirmed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Bestätigt
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                          Offen
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/club/signups/${row.id}`} className="text-ink font-medium hover:text-accent transition-colors">
                        {row.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-ink-soft">{row.email}</td>
                    <td className="py-3 px-4 text-ink-soft">{row.ticket}</td>
                    <td className="py-3 px-4 text-ink-soft max-w-[200px] truncate">
                      {row.project || "—"}
                    </td>
                    <td className="py-3 px-4 text-ink-soft whitespace-nowrap">
                      {row.createdAt
                        ? new Intl.DateTimeFormat("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(row.createdAt))
                        : "—"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
