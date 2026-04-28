import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { signups } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getResend } from "@/lib/resend"

const FROM = "Vibetastic <noreply@vibetastic.de>"
const ADMIN_EMAIL = "nico@contentking.de"

export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, ticket, diet, project } = body

  if (!name || !email || !ticket) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen" },
      { status: 400 }
    )
  }

  await db.insert(signups).values({
    name,
    email,
    ticket,
    diet: diet || "–",
    project: project || null,
  })

  const isWaitlist = ticket?.includes("Warteliste")
  const resend = getResend()

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: email,
        subject: isWaitlist
          ? "Du stehst auf der Warteliste"
          : "Deine Bewerbung ist eingegangen",
        html: isWaitlist
          ? [
              `<p>Hallo ${name},</p>`,
              `<p>du stehst jetzt auf der Warteliste für kommende Vibetastic Workshops. Wir melden uns, sobald neue Termine feststehen.</p>`,
              `<p>Liebe Grüße,<br/>Dein Vibetastic Team</p>`,
            ].join("\n")
          : [
              `<p>Hallo ${name},</p>`,
              `<p>vielen Dank für deine Bewerbung zum Workshop! Wir melden uns innerhalb von 7 Werktagen bei dir.</p>`,
              `<p>Liebe Grüße,<br/>Dein Vibetastic Team</p>`,
            ].join("\n"),
      }),
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: isWaitlist
          ? `Neue Wartelisten-Anmeldung von ${name}`
          : `Neue Bewerbung von ${name}`,
        html: [
          `<p>Neue Bewerbung eingegangen:</p>`,
          `<ul>`,
          `  <li><strong>Name:</strong> ${name}</li>`,
          `  <li><strong>E-Mail:</strong> ${email}</li>`,
          `  <li><strong>Ticket:</strong> ${ticket}</li>`,
          `  <li><strong>Ernährung:</strong> ${diet}</li>`,
          `  <li><strong>Projekt:</strong> ${project || "–"}</li>`,
          `</ul>`,
        ].join("\n"),
      }),
    ])
  } catch (err) {
    console.error("Signup confirmation emails failed:", err)
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const member = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (member.length === 0 || member[0].role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const rows = await db
    .select()
    .from(signups)
    .orderBy(desc(signups.createdAt))

  return NextResponse.json(rows)
}
