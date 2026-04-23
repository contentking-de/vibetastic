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
          ticket: "Workshop — 1.950 € netto",
          diet: data.get("diet"),
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
              ANMELDUNG &middot; SOMMER 2026
            </div>
            <h2 className="font-display font-normal text-[clamp(40px,5vw,64px)] leading-none tracking-display" style={{ textWrap: "balance" }}>
              Bereit, das <em className="italic text-accent">erste Mal</em> zu bauen?
            </h2>
            <p className="max-w-[420px] mt-5 text-[17px]" style={{ color: "color-mix(in oklab, var(--bg) 75%, transparent)" }}>
              Bewirb dich für einen Platz. Wir melden uns innerhalb von 24 Stunden, ob du dabei bist. Bei Zusage erhältst du den Buchungslink.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "TERMIN", v: "02.–04. Jul. 2026" },
                { k: "ORT", v: "Contentking Agentur, Markdorf" },
                { k: "PREIS", v: "1.950 € netto" },
                { k: "PLÄTZE", v: "5 (begrenzt)" },
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
              <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                E-Mail
              </label>
              <input
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
              <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Diät
              </label>
              <select
                name="diet"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
              >
                <option className="bg-ink text-bg" value="Alles">Alles</option>
                <option className="bg-ink text-bg" value="Vegetarisch">Vegetarisch</option>
                <option className="bg-ink text-bg" value="Vegan">Vegan</option>
                <option className="bg-ink text-bg" value="Glutenfrei">Glutenfrei</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[11px] tracking-label uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                Was willst du bauen? (optional)
              </label>
              <textarea
                name="project"
                rows={3}
                placeholder="Eine Buchungsseite für meine Praxis, eine Visitenkarte, ein kleines Tool für den Verein…"
                className="w-full py-3.5 text-base bg-transparent border-0 text-bg outline-none resize-y"
                style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 20%, transparent)" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-3 py-[18px] bg-accent text-accent-ink rounded-full text-[15px] font-medium w-full transition-transform hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Wird gesendet…" : "Für einen Platz bewerben"}
            </button>
            {submitted && (
              <div
                className="p-4 text-center rounded-[10px] text-sm"
                style={{
                  background: "color-mix(in oklab, var(--bg) 15%, transparent)",
                  color: "color-mix(in oklab, var(--bg) 85%, transparent)",
                }}
              >
                ✓ Danke für deine Bewerbung! Wir melden uns innerhalb von 24 h bei dir.
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
