"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const typeLines = [
  { text: "→ Vibetastic Workshop #01", cls: "text-[oklch(0.85_0.15_140)]" },
  { text: "→ 02.–04. Juli 2026, Contentking Agentur, Markdorf", cls: "" },
  { text: "→ 5 Plätze · 2 Workshop-Tage · 0 Vorkenntnisse", cls: "" },
  { text: "→ nächste Cohort startet in …", cls: "opacity-45" },
]

function pad(n: number) {
  return String(n).padStart(2, "0")
}

const rotatingWords = ["Websites", "SaaS-Lösungen", "Web-Portale", "KPI Dashboards", "MVPs", "Agentic Seller", "Support-Agenten", "Agentic-Chats"]

export default function Hero() {
  const [typedLines, setTypedLines] = useState<{ text: string; cls: string }[]>([])
  const lineIdx = useRef(0)
  const charIdx = useRef(0)
  const [countdown, setCountdown] = useState({ d: "00", h: "00", m: "00", s: "00" })
  const [wordIdx, setWordIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const targetDate = new Date("2026-07-02T18:00:00").getTime()
    function updateCD() {
      const now = Date.now()
      let diff = Math.max(0, targetDate - now)
      const d = Math.floor(diff / 86400000); diff -= d * 86400000
      const h = Math.floor(diff / 3600000); diff -= h * 3600000
      const m = Math.floor(diff / 60000); diff -= m * 60000
      const s = Math.floor(diff / 1000)
      setCountdown({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) })
    }
    updateCD()
    const interval = setInterval(updateCD, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % rotatingWords.length)
        setFade(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    function tick() {
      if (lineIdx.current >= typeLines.length) return
      const line = typeLines[lineIdx.current]

      setTypedLines((prev) => {
        const copy = [...prev]
        if (charIdx.current === 0) {
          copy.push({ text: "", cls: line.cls })
        } else {
          copy[copy.length - 1] = {
            text: line.text.slice(0, charIdx.current),
            cls: line.cls,
          }
        }
        return copy
      })

      charIdx.current++
      if (charIdx.current > typeLines[lineIdx.current].text.length) {
        lineIdx.current++
        charIdx.current = 0
        timeout = setTimeout(tick, 220)
      } else {
        timeout = setTimeout(tick, 22 + Math.random() * 30)
      }
    }

    timeout = setTimeout(tick, 400)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <header className="py-[clamp(60px,10vh,120px)] pb-[clamp(80px,12vh,140px)] relative overflow-hidden" id="top">
      <div className="wrap grid grid-cols-1 gap-14 items-start lg:grid-cols-[1.1fr_1fr] lg:gap-[72px]">
        <div className="reveal">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs text-ink-mute tracking-[0.04em] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: "pulse 2s ease-in-out infinite" }} />
            VIBECODING WORKSHOP &nbsp;&middot;&nbsp; 2 TAGE + ANREISEABEND &nbsp;&middot;&nbsp; IN-PERSON
          </div>

          <h1 className="font-display font-normal text-[clamp(36px,5.5vw,72px)] leading-[0.95] tracking-display text-ink mb-7">
            Baue deine<br />
            <span
              className="inline-block transition-all duration-400 font-bold"
              style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)" }}
            >
              {rotatingWords[wordIdx]}
            </span>
            <br /><em className="italic text-accent">in 2 Tagen selber.</em>
          </h1>

          <p className="text-[clamp(17px,1.3vw,19px)] text-ink-soft max-w-[520px] mb-9" style={{ textWrap: "pretty" }}>
            Ein Hands-on-Workshop für Menschen ohne Coding-Erfahrung. Du beschreibst — die KI baut. Am Ende nimmst du deine eigene, live im Netz laufende Website mit nach Hause.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="#signup" className="btn btn-lg btn-accent">Jetzt bewerben — 1.950 € netto</Link>
            <Link href="#what" className="btn btn-lg btn-ghost">Wie funktioniert das?</Link>
          </div>

          <div className="grid grid-cols-3 gap-5 pt-7 border-t border-line">
            <div>
              <div className="font-mono text-[11px] text-ink-mute tracking-label mb-1.5">TERMIN</div>
              <div className="font-display text-[22px] tracking-tight">02.–04. Jul.</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-ink-mute tracking-label mb-1.5">ORT</div>
              <div className="font-display text-[22px] tracking-tight">Contentking Agentur, Markdorf</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-ink-mute tracking-label mb-1.5">PLÄTZE</div>
              <div className="font-display text-[22px] tracking-tight">5 (begrenzt)</div>
            </div>
          </div>
        </div>

        <div className="reveal pt-[50px]">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[11px] tracking-[0.04em]" style={{ color: "color-mix(in oklab, var(--terminal-fg) 60%, transparent)" }}>
                ~/vibetastic/next-cohort
              </span>
            </div>
            <div className="p-[22px_24px_28px] min-h-[340px]">
              <div className="whitespace-pre-wrap">
                <span style={{ color: "color-mix(in oklab, var(--terminal-fg) 45%, transparent)" }}># Willkommen bei Vibetastic</span>
              </div>
              <div className="whitespace-pre-wrap">
                <span className="text-terminal-accent">$</span> workshop.info
              </div>
              {typedLines.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap ${line.cls}`}>
                  {line.text}
                </div>
              ))}

              <div className="grid grid-cols-4 gap-[2px] mt-[18px] rounded-lg overflow-hidden" style={{ background: "color-mix(in oklab, var(--terminal-fg) 10%, transparent)" }}>
                {[
                  { val: countdown.d, lab: "Tage" },
                  { val: countdown.h, lab: "Std" },
                  { val: countdown.m, lab: "Min" },
                  { val: countdown.s, lab: "Sek" },
                ].map((c) => (
                  <div key={c.lab} className="bg-terminal-bg p-[14px_8px] text-center">
                    <div className="text-[26px] font-medium text-terminal-accent tracking-tight tabular-nums">
                      {c.val}
                    </div>
                    <div className="text-[10px] tracking-[0.1em] uppercase mt-[3px]" style={{ color: "color-mix(in oklab, var(--terminal-fg) 55%, transparent)" }}>
                      {c.lab}
                    </div>
                  </div>
                ))}
              </div>

              <div className="whitespace-pre-wrap mt-[18px]">
                <span className="text-terminal-accent">$</span>{" "}
                <span
                  className="inline-block w-2 h-[15px] bg-terminal-accent align-[-2px] ml-[2px]"
                  style={{ animation: "blink 1.1s steps(2) infinite" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
