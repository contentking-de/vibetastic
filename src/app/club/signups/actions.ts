"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members, signups } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getResend } from "@/lib/resend"
import { revalidatePath } from "next/cache"

const FROM = "Vibetastic <noreply@vibetastic.de>"

export async function approveSignup(signupId: string) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Nicht eingeloggt")

  const currentMember = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (currentMember.length === 0 || currentMember[0].role !== "admin") {
    throw new Error("Keine Berechtigung")
  }

  const rows = await db
    .select()
    .from(signups)
    .where(eq(signups.id, signupId))
    .limit(1)

  if (rows.length === 0) throw new Error("Bewerbung nicht gefunden")

  const signup = rows[0]

  const existing = await db
    .select()
    .from(members)
    .where(eq(members.email, signup.email))
    .limit(1)

  if (existing.length > 0) {
    throw new Error("Diese Person ist bereits Mitglied")
  }

  await db.insert(members).values({
    email: signup.email,
    fullName: signup.name,
    role: "member",
  })

  try {
    const resend = getResend()
    await resend.emails.send({
      from: FROM,
      to: signup.email,
      subject: "Willkommen im Vibetastic Club!",
      html: [
        `<p>Hallo ${signup.name},</p>`,
        `<p><strong>Glückwunsch — Du wurdest offiziell in den Vibetastic-Club aufgenommen!</strong></p>`,
        `<p>Wir freuen uns riesig, dass du dabei bist. Im Club-Bereich findest Du alle wichtigen Infos, die Community-Funktion, mit der Du ab sofort Fragen stellen, Ideen challengen, Probleme lösen und Dich mit den Experten und anderen Club-Members austauschen kannst.</p>`,
        `<p>Außerdem findest Du Angaben zum Workshop, zur Anreise, Unterkunft etc.</p>`,
        `<p>Bitte ergänze noch Deine Adressdaten. Wir nutzen diese nur zum Zweck der Rechnungserstellung für den Workshop.</p>`,
        `<p>Du kannst dich ab sofort im Club einloggen und unter „Meine Daten" deine Adresse hinterlegen. Die Anmeldung ist passwortfrei – Du gibst einfach auf vibetastic.de/club Deine Mailadresse ein und bekommst dann den Login-Token als Link.</p>`,
        `<p>Falls Du weitere Fragen hast, nutze einfach den Community-Bereich um sie zu stellen, oder sende uns eine E-Mail an <a href="mailto:maya@vibetastic.de">maya@vibetastic.de</a>.</p>`,
        `<p>Bis bald!<br/>Dein Vibetastic Team</p>`,
      ].join("\n"),
    })
  } catch (err) {
    console.error("Approval email failed:", err)
  }

  revalidatePath(`/club/signups/${signupId}`)
  revalidatePath("/club/signups")
  revalidatePath("/club/mitglieder")

  return { success: true }
}
