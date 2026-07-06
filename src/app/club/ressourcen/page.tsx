import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getResources } from "./actions"
import ResourceForm from "./ResourceForm"
import ResourceList from "./ResourceList"

export default async function RessourcenPage() {
  const session = await auth()
  if (!session?.user?.email || !session?.user?.id) redirect("/login")

  const member = await db
    .select({ role: members.role })
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  const isAdmin = member.length > 0 && member[0].role === "admin"
  const resources = await getResources()

  return (
    <div>
      <div className="mb-8">
        <p className="label-meta mb-2">Wissen teilen</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Ressourcen
        </h1>
        <p className="mt-3 text-on-surface-variant max-w-2xl">
          Hilfreiche Links, Tools und Materialien – von der Community für die Community.
        </p>
      </div>

      <div className="mb-6">
        <ResourceForm />
      </div>

      <ResourceList resources={resources} isAdmin={isAdmin} currentUserId={session.user.id} />
    </div>
  )
}
