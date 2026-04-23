import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode } = await req.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 })
    }

    const systemPrompt =
      mode === "demo"
        ? `Der Nutzer beschreibt eine Miniatur-Website. Antworte AUSSCHLIESSLICH mit einem einzigen <div>-Block Inline-HTML mit inline-styles (keine Codeblöcke, kein Markdown, kein <html>, keine Erklärung). Das div sollte Container-Padding, einen dunklen oder hellen Hintergrund passend zur Beschreibung, Typografie und Buttons enthalten. Maximal ca. 500 Zeichen.`
        : `Du bist ein freundlicher, knapper Assistent für "Vibetastic", einen 2-tägigen Vibecoding-Workshop in der Contentking Agentur in Markdorf für Anfänger:innen. Preis: 1.790 € inkl. Übernachtung. 15.–16. Nov. 2026. 16 Plätze max., Hosts: Mira Hartwig + Mentorin-Team. Tools: Claude, Cursor, Vercel, Neon. Antworte auf Deutsch, warmherzig, in max. 2–3 Sätzen.`

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    })

    const text =
      message.content[0].type === "text" ? message.content[0].text : ""

    return NextResponse.json({ text })
  } catch (error) {
    console.error("AI API error:", error)
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    )
  }
}
