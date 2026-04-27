import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import AddressForm from "@/app/club/meine-daten/AddressForm"
import PaidStatusToggle from "../PaidStatusToggle"

export default async function MitgliedDetailPage({
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
    .from(members)
    .where(eq(members.id, id))
    .limit(1)

  if (rows.length === 0) notFound()

  const member = rows[0]

  const formattedDate = member.createdAt
    ? new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(member.createdAt))
    : "—"

  return (
    <div>
      <Link
        href="/club/mitglieder"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Zurück zur Übersicht
      </Link>

      <div className="mb-8">
        <p className="label-meta mb-2">Admin</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-ink">
          {member.fullName || member.email}
        </h1>
        <p className="mt-1 text-ink-soft">Mitglied seit {formattedDate}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <div className="card p-5">
          <p className="text-xs font-medium text-ink-mute uppercase tracking-wider mb-1.5">E-Mail</p>
          <a href={`mailto:${member.email}`} className="text-ink hover:text-accent transition-colors underline underline-offset-2">
            {member.email}
          </a>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-ink-mute uppercase tracking-wider mb-1.5">Rolle</p>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            member.role === "admin"
              ? "bg-accent/10 text-accent"
              : "bg-bg-soft text-ink-mute"
          }`}>
            {member.role}
          </span>
        </div>
        <div className="card p-5 sm:col-span-2">
          <p className="text-xs font-medium text-ink-mute uppercase tracking-wider mb-1.5">Bezahlt</p>
          <PaidStatusToggle
            memberId={member.id}
            paidAt={member.paidAt?.toISOString() ?? null}
          />
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold text-ink mb-6">Rechnungsadresse</h2>
        <AddressForm
          memberId={member.id}
          initial={{
            fullName: member.fullName ?? "",
            company: member.company ?? "",
            street: member.street ?? "",
            zip: member.zip ?? "",
            city: member.city ?? "",
            country: member.country ?? "Deutschland",
          }}
          isAdmin
        />
      </div>
    </div>
  )
}
