import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import AddressForm from "./AddressForm"

export default async function MeineDatenPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/login")

  const rows = await db
    .select()
    .from(members)
    .where(eq(members.email, session.user.email))
    .limit(1)

  if (rows.length === 0) redirect("/club")

  const member = rows[0]

  return (
    <div>
      <div className="mb-8">
        <p className="label-meta mb-2">Mein Account</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Meine Daten
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Deine Rechnungs- und Adressdaten für den Vibetastic Club.
        </p>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="text-base font-bold text-on-surface mb-1">E-Mail</h2>
        <p className="text-on-surface-variant">{member.email}</p>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold text-on-surface mb-6">Rechnungsadresse</h2>
        <AddressForm
          memberId={member.id}
          initial={{
            fullName: member.fullName ?? "",
            company: member.company ?? "",
            street: member.street ?? "",
            zip: member.zip ?? "",
            city: member.city ?? "",
            country: member.country ?? "Deutschland",
          }}
        />
      </div>
    </div>
  )
}
