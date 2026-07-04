import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getDownloads } from "./actions"
import UploadForm from "./UploadForm"
import DownloadList from "./DownloadList"

export default async function DownloadsPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const member = await db
    .select({ role: members.role })
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  const isAdmin = member.length > 0 && member[0].role === "admin"
  const downloads = await getDownloads()

  return (
    <div>
      <div className="mb-8">
        <p className="label-meta mb-2">Dokumente</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Downloads
        </h1>
        <p className="mt-3 text-on-surface-variant max-w-2xl">
          Hier findest du alle Unterlagen, Anleitungen und Materialien zum Workshop.
        </p>
      </div>

      {isAdmin && (
        <div className="mb-6">
          <UploadForm />
        </div>
      )}

      <DownloadList downloads={downloads} isAdmin={isAdmin} />
    </div>
  )
}
