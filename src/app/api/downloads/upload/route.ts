import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 })
  }

  const member = await db
    .select({ role: members.role })
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (member.length === 0 || member[0].role !== "admin") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  const { pathname } = await req.json()
  if (!pathname) {
    return NextResponse.json({ error: "Pfad fehlt" }, { status: 400 })
  }

  const clientToken = await generateClientTokenFromReadWriteToken({
    token: process.env.BLOB_READ_WRITE_TOKEN!,
    pathname,
  })

  return NextResponse.json({ clientToken })
}
