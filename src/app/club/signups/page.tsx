import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { signups, members } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
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

  return (
    <div>
      <div className="mb-8">
        <p className="label-meta mb-2">Admin</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Anmeldungen
        </h1>
        <p className="mt-3 text-on-surface-variant">
          {rows.length === 0
            ? "Noch keine Anmeldungen eingegangen."
            : `${rows.length} Anmeldung${rows.length === 1 ? "" : "en"} insgesamt.`}
        </p>
      </div>

      {rows.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">Name</th>
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">E-Mail</th>
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">Ticket</th>
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">Diät</th>
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">Projekt</th>
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">Datum</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-variant/30 transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/club/signups/${row.id}`} className="text-on-surface font-medium hover:text-primary transition-colors">
                      {row.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">{row.email}</td>
                  <td className="py-3 px-4 text-on-surface-variant">{row.ticket}</td>
                  <td className="py-3 px-4 text-on-surface-variant">{row.diet}</td>
                  <td className="py-3 px-4 text-on-surface-variant max-w-[200px] truncate">
                    {row.project || "—"}
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant whitespace-nowrap">
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
