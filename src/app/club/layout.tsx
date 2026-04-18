import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Header from "@/components/layout/Header"
import ClubNav from "@/components/club/ClubNav"

export default async function ClubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <>
      <Header />
      <div className="pt-24 pb-16 min-h-screen bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <ClubNav />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
