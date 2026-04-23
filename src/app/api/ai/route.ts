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
        : `Du bist ein freundlicher, knapper Assistent für "Vibetastic", einen Vibecoding-Workshop in der Contentking Agentur in Markdorf für Anfänger:innen. Workshop: 02.–04. Juli 2026 (Donnerstagabend Anreise, Freitag+Samstag Workshop). Preis: 1.950 € netto zzgl. MwSt., inkl. 2 Übernachtungen im Einzelzimmer, komplette Verpflegung inkl. Getränke, 1:1 Support. Nicht inklusive: Anreise/Abreise, Zugang zu Tools & Programme. 5 Plätze max. Hosts: Nicolas Sacotte, Maya Sacotte, Thorsten Loth. Tools: Claude, Cursor, Vercel, Neon. Anreise mit Zug bis Markdorf Bahnhof ganz easy. Hotel ist in unmittelbarer Nähe. Mitbringen: Laptop mit den im Onboarding aufgelisteten Programmen (wird nach Bezahlung im Club-Bereich freigeschaltet). Antworte auf Deutsch, warmherzig, in max. 2–3 Sätzen.`

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
