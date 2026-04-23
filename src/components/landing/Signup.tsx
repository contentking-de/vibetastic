"use client"

import { useState } from "react"

export default function Signup() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    ;(e.target as HTMLFormElement).reset()
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
              ANMELDUNG &middot; HERBST 2026
            </div>
            <h2 className="font-display font-normal text-[clamp(40px,5vw,64px)] leading-none tracking-display" style={{ textWrap: "balance" }}>
              Bereit, das <em className="italic text-accent">erste Mal</em> zu bauen?
            </h2>
            <p className="max-w-[420px] mt-5 text-[17px]" style={{ color: "color-mix(in oklab, var(--bg) 75%, transparent)" }}>
              Fülle das Formular aus, wir melden uns innerhalb von 24 Stunden. Nach Bestätigung erhältst du die Rechnung und alle Infos zur Anreise.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "TERMIN", v: "15.–16. Nov. 2026" },
                { k: "ORT", v: "Contentking Agentur, Markdorf" },
                { k: "PREIS", v: "1.790 € all-in" },
                { k: "PLÄTZE", v: "Noch 4 offen" },
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

          {/* Right form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 grid gap-4"
            style={{ background: "color-mix(in oklab, var(--bg) 10%, var(--ink))" }}
          >
            <div>
              <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Vollständiger Name
              </label>
              <input
                required
                placeholder="Jana Musterfrau"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none transition-colors"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent)" }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                E-Mail
              </label>
              <input
                required
                type="email"
                placeholder="jana@beispiel.de"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none transition-colors"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent)" }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                  Ticket
                </label>
                <select
                  className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none"
                  style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
                >
                  <option className="bg-ink text-bg">Standard — 1.790 €</option>
                  <option className="bg-ink text-bg">Team — 1.590 € / Person</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                  Diät
                </label>
                <select
                  className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none"
                  style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
                >
                  <option className="bg-ink text-bg">Alles</option>
                  <option className="bg-ink text-bg">Vegetarisch</option>
                  <option className="bg-ink text-bg">Vegan</option>
                  <option className="bg-ink text-bg">Glutenfrei</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Was willst du bauen? (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Eine Buchungsseite für meine Praxis, eine Visitenkarte, ein kleines Tool für den Verein…"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none resize-y"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <button
              type="submit"
              className="mt-3 py-[18px] bg-accent text-accent-ink rounded-full text-[15px] font-medium w-full transition-transform hover:-translate-y-[1px]"
            >
              Platz unverbindlich reservieren
            </button>
            {submitted && (
              <div
                className="p-4 text-center rounded-[10px] text-sm"
                style={{
                  background: "color-mix(in oklab, var(--bg) 15%, transparent)",
                  color: "color-mix(in oklab, var(--bg) 85%, transparent)",
                }}
              >
                ✓ Danke! Wir melden uns innerhalb von 24 h bei dir.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
