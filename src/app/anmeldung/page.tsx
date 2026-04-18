"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const included = [
  "2 Tage Intensiv-Workshop vor Ort",
  "Persönliche Betreuung in Kleingruppe (max. 15)",
  "Alle Workshop-Materialien, Templates & Checklisten",
  "Exklusiver Zugang zum Vibetastic Club",
  "Lebenslanger Zugang zu Updates & Community",
  "Getränke & Snacks inklusive",
]

export default function AnmeldungPage() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-surface min-h-screen">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <p className="label-meta mb-4">Anmeldung</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-display text-on-surface leading-tight">
              Sichere dir deinen Platz
            </h1>
            <p className="mt-6 text-lg text-on-surface-variant max-w-xl mx-auto">
              Investiere in deine Zukunft. Lerne Vibe Coding und baue
              Projekte, die begeistern.
            </p>
          </div>

          <div className="max-w-lg mx-auto card-floating">
            <p className="label-meta mb-2">Vibetastic Workshop</p>
            <p className="text-sm text-on-surface-variant mb-8">
              2-Tage Intensiv &middot; Vor Ort &middot; Max. 5 Plätze
            </p>

            <div className="mb-8">
              <span className="text-6xl font-bold tracking-display text-on-surface">
                297
              </span>
              <span className="text-2xl text-on-surface-variant ml-1">&euro;</span>
              <p className="text-sm text-on-surface-variant mt-1">
                Einmalige Zahlung inkl. MwSt.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-on-surface-variant">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-60"
            >
              {loading ? "Wird geladen..." : "Jetzt buchen"}
            </button>

            <p className="mt-4 text-xs text-on-surface-variant/60 text-center">
              Sichere Zahlung über Stripe. Du wirst zur Zahlungsseite
              weitergeleitet.
            </p>
          </div>

          <p className="mt-12 text-center text-sm text-on-surface-variant">
            Fragen? Schreib uns an{" "}
            <a
              href="mailto:hallo@vibetastic.de"
              className="text-primary underline underline-offset-4"
            >
              hallo@vibetastic.de
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
