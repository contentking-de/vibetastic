"use client"

import { useState } from "react"

const defaultPrompt = `Ich möchte ein Online-Portal für lokale Bäckereien bauen.
Kunden sollen Brot und Kuchen vorbestellen und zur Abholung reservieren können.
Ich habe keine Programmierkenntnisse, aber Erfahrung im Einzelhandel.`

export default function LiveDemo() {
  const [input, setInput] = useState(defaultPrompt)
  const [preview, setPreview] = useState("")
  const [status, setStatus] = useState("▸ bereit")
  const [loading, setLoading] = useState(false)

  async function runDemo() {
    if (loading) return
    setLoading(true)
    setStatus("▸ denkt nach…")
    setPreview('<div style="color: var(--ink-mute); font-family: var(--font-mono); font-size: 12px;">Die KI analysiert deine Idee…</div>')

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, mode: "demo" }),
      })
      const data = await res.json()
      if (data.text) {
        const cleaned = data.text.trim().replace(/^```html/i, "").replace(/```$/, "").trim()
        setPreview(cleaned)
        setStatus(`▸ fertig · in ${(Math.random() * 1.5 + 0.8).toFixed(1)}s`)
      } else {
        throw new Error("No text")
      }
    } catch {
      setPreview('<div style="color: var(--ink-mute); font-size: 13px;">Ups — die Demo ist gerade nicht erreichbar. Im Workshop nutzen wir stabile, produktionsreife Tools.</div>')
      setStatus("▸ Fehler")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="demo">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">04 &nbsp;/&nbsp; Probier&apos;s aus</div>
          <h2 className="sec-title">So fühlt sich <em>Vibecoding</em> an.</h2>
          <p className="sec-lede">
            Beschreib grob deine Geschäftsidee — die KI analysiert sie und macht dir Vorschläge, wie du sie umsetzen könntest. Genau so starten wir auch im Workshop. Das hast Du vielleicht sogar schon mal selber ausprobiert – wir gehen jetzt tief ins Detail und zeigen Dir das perfekte Setup und die richtige Vorgehensweise, um aus der Grundidee ein stabiles Projekt zu bauen.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
          {/* Editor */}
          <div
            className="bg-terminal-bg text-terminal-fg rounded-[14px] overflow-hidden font-mono text-[13px] h-[420px] flex flex-col"
            style={{ border: "1px solid color-mix(in oklab, var(--terminal-fg) 12%, transparent)" }}
          >
            <div
              className="flex justify-between items-center px-4 py-2.5 text-[11px]"
              style={{
                background: "color-mix(in oklab, var(--terminal-fg) 6%, var(--terminal-bg))",
                borderBottom: "1px solid color-mix(in oklab, var(--terminal-fg) 10%, transparent)",
                color: "color-mix(in oklab, var(--terminal-fg) 60%, transparent)",
              }}
            >
              <div className="flex gap-1">
                <div className="px-3.5 py-1.5 rounded-t-md bg-terminal-bg text-terminal-fg">meine-idee.txt</div>
              </div>
              <span>beschreib einfach deine Idee</span>
            </div>
            <textarea
              aria-label="Beschreib deine Idee"
              className="w-full flex-1 bg-terminal-bg text-terminal-fg border-0 outline-none resize-none p-5 font-mono text-[13px] leading-[1.7]"
              style={{ tabSize: 2 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault()
                  runDemo()
                }
              }}
              spellCheck={false}
            />
            <div
              className="flex justify-between items-center px-4 py-2.5 text-[11px]"
              style={{
                borderTop: "1px solid color-mix(in oklab, var(--terminal-fg) 10%, transparent)",
                color: "color-mix(in oklab, var(--terminal-fg) 60%, transparent)",
              }}
            >
              <span>⌘ + ↵ zum Ausführen</span>
              <button
                onClick={runDemo}
                className="bg-terminal-accent text-[#0e0e10] px-3.5 py-1.5 rounded-md font-medium"
                disabled={loading}
              >
                Ausführen →
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-bg-card border border-line rounded-[14px] p-7 h-[420px] flex flex-col gap-4">
            <div className="font-mono text-[11px] text-ink-mute tracking-wide uppercase">
              KI-Analyse
            </div>
            <div className="flex-1 p-6 bg-bg-soft rounded-[10px] overflow-y-auto">
              {preview ? (
                <div className="w-full text-left text-[14px] text-ink-soft leading-relaxed prose-sm" dangerouslySetInnerHTML={{ __html: preview }} />
              ) : (
                <div className="text-left w-full flex items-center justify-center h-full">
                  <div>
                    <div className="font-mono text-[11px] text-ink-mute mb-4">
                      {"// die Analyse erscheint hier"}
                    </div>
                    <div className="opacity-50 text-sm text-ink-mute">
                      Klick &quot;Ausführen&quot;, um deine Idee analysieren zu lassen.
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-[13px] text-ink-mute font-mono">{status}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
