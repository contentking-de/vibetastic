import { del } from "@vercel/blob"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members, clubDownloads } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

async function getAdminSession() {
  const session = await auth()
  if (!session?.user?.email || !session?.user?.id) return null

  const member = await db
    .select({ role: members.role })
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (member.length === 0 || member[0].role !== "admin") return null
  return session
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  const { title, description, fileName, fileSize, mimeType, blobUrl } = await req.json()

  if (!title?.trim() || !blobUrl || !fileName) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 })
  }

  const [download] = await db
    .insert(clubDownloads)
    .values({
      title: title.trim(),
      description: description?.trim() || null,
      fileName,
      fileSize: fileSize || 0,
      mimeType: mimeType || "application/octet-stream",
      blobUrl,
      uploadedBy: session.user.id!,
    })
    .returning()

  return NextResponse.json({ download })
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: "ID erforderlich" }, { status: 400 })
  }

  const existing = await db
    .select({ blobUrl: clubDownloads.blobUrl })
    .from(clubDownloads)
    .where(eq(clubDownloads.id, id))
    .limit(1)

  if (!existing[0]) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 })
  }

  await del(existing[0].blobUrl)
  await db.delete(clubDownloads).where(eq(clubDownloads.id, id))

  return NextResponse.json({ ok: true })
}
