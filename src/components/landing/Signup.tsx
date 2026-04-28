"use client"

import { useState } from "react"

export default function Signup() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          ticket: "Warteliste — Folgetermin",
          diet: "",
          project: data.get("project") || null,
        }),
      })

      if (!res.ok) throw new Error("Fehler beim Absenden")

      setSubmitted(true)
      form.reset()
    } catch {
      setError("Etwas ist schiefgelaufen. Bitte versuche es erneut.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-[clamp(80px,12vh,140px)]" id="signup">
      <div className="wrap">
        <div
          className="reveal bg-ink text-bg rounded-[20px] p-[clamp(40px,6vw,72px)] grid gap-10 grid-cols-1 lg:grid-cols-[1.1fr_1fr]"
        >
          {/* Left info */}
          <div>
            <div
              className="font-mono text-xs tracking-wide mb-7"
              style={{ color: "color-mix(in oklab, var(--bg) 60%, transparent)" }}
            >
              WORKSHOP #01 &middot; AUSVERKAUFT
            </div>
            <h2 className="font-display font-normal text-[clamp(40px,5vw,64px)] leading-none tracking-display" style={{ textWrap: "balance" }}>
              5 von 5 Plätzen <em className="text-accent">vergeben.</em>
            </h2>
            <p className="max-w-[420px] mt-5 text-[17px]" style={{ color: "color-mix(in oklab, var(--bg) 75%, transparent)" }}>
              Workshop #01 ist komplett ausgebucht. Aber keine Sorge — wir planen bereits Folgetermine, die in Kürze bekannt gegeben werden. Trag dich auf die Warteliste ein, damit du als Erste:r erfährst, wann es weitergeht.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "TERMIN", v: "02.–04. Jul. 2026" },
                { k: "ORT", v: "Contentking Agentur, Markdorf" },
                { k: "STATUS", v: "Ausverkauft" },
                { k: "PLÄTZE", v: "5 / 5 vergeben" },
              ].map((item) => (
                <div key={item.k} className="pt-4" style={{ borderTop: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}>
                  <div className="font-mono text-[11px] tracking-label mb-1" style={{ color: "color-mix(in oklab, var(--bg) 55%, transparent)" }}>
                    {item.k}
                  </div>
                  <div className="font-display text-[22px]">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form — waitlist */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 grid gap-4 content-start"
            style={{ background: "color-mix(in oklab, var(--bg) 10%, var(--ink))" }}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-label uppercase text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Warteliste für Folgetermine
            </div>
            <div>
              <label htmlFor="name" className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Vollständiger Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Jana Musterfrau"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none transition-colors"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent)" }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                required
                type="email"
                placeholder="jana@beispiel.de"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none transition-colors"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent)" }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <div>
              <label htmlFor="project" className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Deine Projekt-Idee (optional)
              </label>
              <textarea
                id="project"
                name="project"
                rows={2}
                placeholder="Was möchtest du bauen?"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none resize-y"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 accent-accent w-4 h-4 shrink-0"
              />
              <span className="text-[13px] leading-relaxed" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Ich bin damit einverstanden, dass meine Daten gespeichert werden. Mehr dazu in unserer <a href="/datenschutz" className="underline hover:text-bg transition-colors">Datenschutzerklärung</a>.
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-3 py-[18px] bg-accent text-accent-ink rounded-full text-[15px] font-medium w-full transition-transform hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Wird gesendet…" : "Auf die Warteliste setzen"}
            </button>
            {submitted && (
              <div
                className="p-4 text-center rounded-[10px] text-sm"
                style={{
                  background: "color-mix(in oklab, var(--bg) 15%, transparent)",
                  color: "color-mix(in oklab, var(--bg) 85%, transparent)",
                }}
              >
                ✓ Du stehst auf der Warteliste! Wir melden uns, sobald neue Termine feststehen.
              </div>
            )}
            {error && (
              <div
                className="p-4 text-center rounded-[10px] text-sm text-red-300"
                style={{
                  background: "color-mix(in oklab, red 10%, transparent)",
                }}
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
