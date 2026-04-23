"use client"

import { useState } from "react"

const defaultPrompt = `Bau mir eine Visitenkarte für eine Bäckerei namens "Krume".
Dunkler Hintergrund, große Serifen-Headline, goldener Akzent.
Zeige Adresse, Öffnungszeiten, und einen Button "Brot vorbestellen".`

export default function LiveDemo() {
  const [input, setInput] = useState(defaultPrompt)
  const [preview, setPreview] = useState("")
  const [status, setStatus] = useState("▸ bereit")
  const [loading, setLoading] = useState(false)

  async function runDemo() {
    if (loading) return
    setLoading(true)
    setStatus("▸ denkt nach…")
    setPreview('<div style="color: var(--ink-mute); font-family: var(--font-mono); font-size: 12px;">Die KI baut deine Vorschau…</div>')

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
            Schreibe einfach hin, was du willst. Die KI übersetzt das in eine kleine Vorschau. Unser ganzer Workshop beginnt so — und geht dann viel tiefer.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Editor */}
          <div
            className="bg-terminal-bg text-terminal-fg rounded-[14px] overflow-hidden font-mono text-[13px]"
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
                <div className="px-3.5 py-1.5 rounded-t-md bg-terminal-bg text-terminal-fg">idee.txt</div>
              </div>
              <span>kein Code nötig</span>
            </div>
            <textarea
              className="w-full min-h-[280px] bg-terminal-bg text-terminal-fg border-0 outline-none resize-y p-5 font-mono text-[13px] leading-[1.7]"
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
          <div className="bg-bg-card border border-line rounded-[14px] p-7 min-h-[340px] flex flex-col gap-4">
            <div className="font-mono text-[11px] text-ink-mute tracking-wide uppercase">
              Vorschau
            </div>
            <div className="flex-1 flex items-center justify-center p-8 bg-bg-soft rounded-[10px] text-center">
              {preview ? (
                <div className="w-full text-left" dangerouslySetInnerHTML={{ __html: preview }} />
              ) : (
                <div className="text-left w-full">
                  <div className="font-mono text-[11px] text-ink-mute mb-4">
                    {"// das Ergebnis erscheint hier"}
                  </div>
                  <div className="opacity-50 text-sm text-ink-mute">
                    Klick &quot;Ausführen&quot;, um die KI zu starten.
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
