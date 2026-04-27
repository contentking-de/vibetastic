import "dotenv/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { forumChannels } from "../src/lib/db/schema"

const channels = [
  { name: "Allgemein", slug: "allgemein", emoji: "💬", description: "Allgemeiner Austausch — alles, was nicht in einen speziellen Kanal passt." },
  { name: "Fragen & Hilfe", slug: "fragen", emoji: "🙋", description: "Stelle Fragen zu Vibe Coding, Tools, Projekten und bekomme Hilfe." },
  { name: "Projekte", slug: "projekte", emoji: "🚀", description: "Teile deine Projekte, zeige Fortschritte und bekomme Feedback." },
  { name: "Tools & Ressourcen", slug: "tools", emoji: "🔧", description: "Tipps zu Tools, Prompts, APIs und nützlichen Ressourcen." },
  { name: "Ideen & Inspiration", slug: "ideen", emoji: "💡", description: "Brainstorming, Ideen für Projekte und kreative Impulse." },
  { name: "Off-Topic", slug: "off-topic", emoji: "☕", description: "Alles außer Vibe Coding — Smalltalk, Memes, Kaffeepausen." },
]

async function seedChannels() {
  const client = neon(process.env.DATABASE_URL!)
  const db = drizzle(client)

  for (const ch of channels) {
    await db
      .insert(forumChannels)
      .values(ch)
      .onConflictDoNothing({ target: forumChannels.slug })

    console.log(`✓ Channel seeded: ${ch.emoji} ${ch.name}`)
  }

  console.log("\nDone! Forum channels are ready.")
}

seedChannels().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
