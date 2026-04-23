"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "bot" | "user"
  text: string
}

const defaultChips = [
  "Was muss ich mitbringen?",
  "Ich bin 100% Anfänger — geht das?",
  "Was passiert bei Absage?",
  "Kann ich mit dem Zug kommen?",
]

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi 👋 Ich beantworte Fragen zum Wochenend-Workshop. Was möchtest du wissen?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, loading])

  async function sendMessage(text?: string) {
    const q = (text || input).trim()
    if (!q || loading) return
    setInput("")

    setMessages((prev) => [...prev, { role: "user", text: q }])
    setLoading(true)

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q, mode: "chat" }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: "bot", text: data.text || "Gerade ist der Assistent offline — schreib uns einfach per Formular unten, wir antworten innerhalb 24 h." }])
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Gerade ist der Assistent offline — schreib uns einfach per Formular unten, wir antworten innerhalb 24 h." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="chat">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">08 &nbsp;/&nbsp; Frag uns</div>
          <h2 className="sec-title">Unsicher, ob das etwas für dich ist?</h2>
          <p className="sec-lede">
            Unser kleiner Assistent beantwortet die häufigsten Fragen rund um den Workshop. Ehrlich, keine Verkaufsgespräche.
          </p>
        </div>

        <div className="reveal bg-bg-card border border-line rounded-2xl overflow-hidden max-w-[720px] mx-auto">
          {/* Head */}
          <div className="px-6 py-[18px] border-b border-line flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "oklch(0.72 0.15 140)", animation: "pulse 2s ease-in-out infinite" }}
            />
            <div className="text-sm font-medium">Vibetastic Assistant</div>
            <div className="ml-auto font-mono text-[11px] text-ink-mute">ONLINE</div>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="px-6 py-6 min-h-[320px] max-h-[420px] overflow-y-auto flex flex-col gap-3.5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-3 rounded-[14px] text-[15px] leading-relaxed ${
                  msg.role === "bot"
                    ? "bg-bg-soft self-start rounded-bl"
                    : "bg-ink text-bg self-end rounded-br"
                }`}
                style={{ animation: "slide-up 0.3s ease both" }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bg-bg-soft self-start max-w-[80%] px-4 py-3 rounded-[14px] rounded-bl flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="inline-block w-1.5 h-1.5 rounded-full bg-ink-mute"
                    style={{ animation: `bounce 1.2s infinite ease-in-out ${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 px-6 pb-5">
            {defaultChips.map((chip) => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                className="text-xs px-3.5 py-2 bg-bg-soft rounded-full text-ink-soft cursor-pointer transition-colors hover:bg-line"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-0 px-5 py-4 border-t border-line">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
              placeholder="Deine Frage…"
              className="flex-1 bg-transparent border-0 outline-none text-[15px] py-2.5"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-accent text-accent-ink px-5 py-2.5 rounded-[10px] text-[13px] font-medium"
            >
              Senden
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
