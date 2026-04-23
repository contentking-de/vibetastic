import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Header from "@/components/layout/Header"
import ClubNav from "@/components/club/ClubNav"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function ClubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  let isAdmin = false
  if (session.user.email) {
    const member = await db
      .select({ role: members.role })
      .from(members)
      .where(eq(members.email, session.user.email))
      .limit(1)

    isAdmin = member.length > 0 && member[0].role === "admin"
  }

  return (
    <>
      <Header />
      <div className="pt-24 pb-16 min-h-screen bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <ClubNav isAdmin={isAdmin} />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
