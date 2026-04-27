import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { signups, members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import AddressForm from "@/app/club/meine-daten/AddressForm"
import ApproveButton from "../ApproveButton"

export default async function SignupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const currentMember = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (currentMember.length === 0 || currentMember[0].role !== "admin") {
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

  const linkedMember = await db
    .select()
    .from(members)
    .where(eq(members.email, row.email))
    .limit(1)

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

      {linkedMember.length > 0 ? (
        <div className="mt-8 card p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Bestätigt
            </span>
          </div>
          <h2 className="text-base font-bold text-ink mb-1">
            Rechnungsadresse
          </h2>
          <p className="text-sm text-ink-soft mb-6">
            Club-Mitglied seit {linkedMember[0].createdAt
              ? new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(linkedMember[0].createdAt))
              : "unbekannt"}
          </p>
          <AddressForm
            memberId={linkedMember[0].id}
            initial={{
              fullName: linkedMember[0].fullName ?? row.name,
              company: linkedMember[0].company ?? "",
              street: linkedMember[0].street ?? "",
              zip: linkedMember[0].zip ?? "",
              city: linkedMember[0].city ?? "",
              country: linkedMember[0].country ?? "Deutschland",
            }}
            isAdmin
          />
        </div>
      ) : (
        <div className="mt-8 card p-6">
          <h2 className="text-base font-bold text-ink mb-2">Mitgliedschaft</h2>
          <p className="text-sm text-ink-soft mb-4">
            Diese Person ist noch kein Club-Mitglied. Mit der Bestätigung wird ein Mitglied angelegt und eine Willkommens-Mail verschickt.
          </p>
          <ApproveButton signupId={row.id} />
        </div>
      )}
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
