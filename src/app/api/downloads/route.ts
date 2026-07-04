import { put, del } from "@vercel/blob"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members, clubDownloads } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

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

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const title = formData.get("title") as string | null
  const description = formData.get("description") as string | null

  if (!file || !title?.trim()) {
    return NextResponse.json({ error: "Datei und Titel erforderlich" }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Max. 50 MB pro Datei" }, { status: 400 })
  }

  const ext = file.name.split(".").pop() || "bin"
  const filename = `downloads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
  })

  const [download] = await db
    .insert(clubDownloads)
    .values({
      title: title.trim(),
      description: description?.trim() || null,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || "application/octet-stream",
      blobUrl: blob.url,
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
