import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { signups, members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"

export default async function SignupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
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

  const { id } = await params

  const rows = await db
    .select()
    .from(signups)
    .where(eq(signups.id, id))
    .limit(1)

  if (rows.length === 0) notFound()

  const row = rows[0]

  const formattedDate = row.createdAt
    ? new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(row.createdAt))
    : "—"

  return (
    <div>
      <Link
        href="/club/signups"
        className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Zurück zur Übersicht
      </Link>

      <div className="mb-8">
        <p className="label-meta mb-2">Admin</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          {row.name}
        </h1>
        <p className="mt-1 text-on-surface-variant">{formattedDate}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <DetailCard label="E-Mail" value={row.email} href={`mailto:${row.email}`} />
        <DetailCard label="Ticket" value={row.ticket} />
        <DetailCard label="Diät / Allergien" value={row.diet} />
        <div className="sm:col-span-2">
          <DetailCard label="Projektidee" value={row.project || "—"} multiline />
        </div>
      </div>
    </div>
  )
}

function DetailCard({
  label,
  value,
  href,
  multiline,
}: {
  label: string
  value: string
  href?: string
  multiline?: boolean
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-1.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-on-surface hover:text-primary transition-colors underline underline-offset-2"
        >
          {value}
        </a>
      ) : (
        <p className={`text-on-surface ${multiline ? "whitespace-pre-wrap" : ""}`}>
          {value}
        </p>
      )}
    </div>
  )
}
