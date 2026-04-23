import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { signups } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, ticket, diet, project } = body

  if (!name || !email || !ticket || !diet) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen" },
      { status: 400 }
    )
  }

  await db.insert(signups).values({
    name,
    email,
    ticket,
    diet,
    project: project || null,
  })

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
