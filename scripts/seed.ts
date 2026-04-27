import "dotenv/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { members } from "../src/lib/db/schema"
import { sql } from "drizzle-orm"

async function seed() {
  const client = neon(process.env.DATABASE_URL!)
  const db = drizzle(client)

  const seedMembers = [
    { email: "nico@contentking.de" },
    { email: "maya.sacotte@outlook.de" },
    { email: "thorsten.loth@omfire.de", role: "admin" as const, fullName: "Thorsten Loth" },
  ]

  for (const m of seedMembers) {
    await db
      .insert(members)
      .values({
        email: m.email,
        paidAt: new Date(),
        ...("role" in m && { role: m.role }),
        ...("fullName" in m && { fullName: m.fullName }),
      })
      .onConflictDoNothing({ target: members.email })

    console.log(`✓ Member seeded: ${m.email}${m.role ? ` (${m.role})` : ""}`)
  }

  console.log("\nDone! All members can now log in.")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
