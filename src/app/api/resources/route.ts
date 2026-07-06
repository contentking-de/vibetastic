import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members, clubResources } from "@/lib/db/schema"
import { eq, and, or, isNotNull, ne } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { getResend } from "@/lib/resend"

async function getAuthenticatedSession() {
  const session = await auth()
  if (!session?.user?.email || !session?.user?.id) return null

  const member = await db
    .select({ role: members.role })
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (member.length === 0) return null
  return { session, isAdmin: member[0].role === "admin" }
}

export async function POST(req: NextRequest) {
  const result = await getAuthenticatedSession()
  if (!result) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  const { title, url, description } = await req.json()

  if (!title?.trim() || !url?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "Alle Felder sind Pflichtfelder" }, { status: 400 })
  }

  try {
    new URL(url.trim())
  } catch {
    return NextResponse.json({ error: "Ungültige URL" }, { status: 400 })
  }

  const [resource] = await db
    .insert(clubResources)
    .values({
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      createdBy: result.session.user.id!,
    })
    .returning()

  const authorName = result.session.user.name || result.session.user.email?.split("@")[0] || "Jemand"
  notifyMembersAboutResource({
    authorEmail: result.session.user.email!,
    authorName,
    title: title.trim(),
    url: url.trim(),
    description: description.trim(),
  }).catch(() => {})

  return NextResponse.json({ resource })
}

export async function DELETE(req: NextRequest) {
  const result = await getAuthenticatedSession()
  if (!result) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
  }

  const existing = await db
    .select({ createdBy: clubResources.createdBy })
    .from(clubResources)
    .where(eq(clubResources.id, id))
    .limit(1)

  if (!existing[0]) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 })
  }

  if (!result.isAdmin && existing[0].createdBy !== result.session.user.id) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  await db.delete(clubResources).where(eq(clubResources.id, id))

  return NextResponse.json({ ok: true })
}

async function notifyMembersAboutResource({
  authorEmail,
  authorName,
  title,
  url,
  description,
}: {
  authorEmail: string
  authorName: string
  title: string
  url: string
  description: string
}) {
  const allMembers = await db
    .select({ email: members.email })
    .from(members)
    .where(
      and(
        or(isNotNull(members.paidAt), eq(members.role, "admin")),
        ne(members.email, authorEmail)
      )
    )

  const recipients = allMembers.map((m) => m.email).filter(Boolean)
  if (recipients.length === 0) return

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://vibetastic.de"
  const link = `${baseUrl}/club/ressourcen`
  const preview = description.length > 200 ? description.slice(0, 200) + "…" : description

  const resend = getResend()

  await resend.batch.send(
    recipients.map((to) => ({
      from: "Vibetastic Club <noreply@vibetastic.de>",
      to,
      subject: `${authorName} hat eine neue Ressource geteilt: ${title}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 0;">
          <p style="margin: 0 0 20px; color: #6e6a62; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">
            Vibetastic Club
          </p>
          <p style="margin: 0 0 16px; font-size: 15px; color: #0e0e10;">
            <strong>${authorName}</strong> hat eine neue Ressource geteilt:
          </p>
          <div style="background: #f3efe7; border-radius: 10px; padding: 16px 20px; margin: 0 0 12px;">
            <p style="margin: 0 0 8px; font-size: 15px; font-weight: 600; color: #0e0e10;">
              ${title.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #3a3a3e; line-height: 1.6;">
              ${preview.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}
            </p>
            <a href="${url}" style="font-size: 13px; color: #5a56e8; text-decoration: underline; word-break: break-all;">
              ${url.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </a>
          </div>
          <a href="${link}" style="display: inline-block; background: #0e0e10; color: #f3efe7; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; margin-top: 12px;">
            Alle Ressourcen ansehen &rarr;
          </a>
          <p style="margin: 32px 0 0; font-size: 12px; color: #8a857c;">
            Du bekommst diese Mail, weil du Mitglied im Vibetastic Club bist.
          </p>
        </div>
      `,
    }))
  )
}
