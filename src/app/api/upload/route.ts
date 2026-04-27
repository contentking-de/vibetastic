import { put } from "@vercel/blob"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "Keine Datei" }, { status: 400 })
  }

  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Nur Bilder (JPG, PNG, GIF, WebP)" }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Max. 5 MB" }, { status: 400 })
  }

  const ext = file.name.split(".").pop() || "png"
  const filename = `community/${session.user.id}/${Date.now()}.${ext}`

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
  })

  return NextResponse.json({ url: blob.url })
}
