import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = (await req.json()) as HandleUploadBody

  const jsonResponse = await handleUpload({
    body,
    request: req,
    onBeforeGenerateToken: async (pathname) => {
      const session = await auth()
      if (!session?.user?.email) throw new Error("Nicht eingeloggt")

      const member = await db
        .select({ role: members.role })
        .from(members)
        .where(eq(members.email, session.user.email))
        .limit(1)

      if (member.length === 0 || member[0].role !== "admin") {
        throw new Error("Keine Berechtigung")
      }

      return {
        maximumSizeInBytes: 50 * 1024 * 1024,
      }
    },
    onUploadCompleted: async () => {},
  })

  return NextResponse.json(jsonResponse)
}
