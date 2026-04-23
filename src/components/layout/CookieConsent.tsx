"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const CONSENT_KEY = "vibetastic-cookie-consent"

type ConsentValue = "all" | "essential" | null

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === "all" || stored === "essential") {
      setConsent(stored)
    } else {
      setVisible(true)
    }
  }, [])

  function accept(value: "all" | "essential") {
    localStorage.setItem(CONSENT_KEY, value)
    setConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div
        className="mx-auto max-w-2xl rounded-2xl border border-line bg-bg-card p-6 md:p-8 shadow-2xl"
        style={{
          animation: "slideUp 0.4s ease-out",
        }}
      >
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-display text-[18px] text-ink mb-2">
              Cookies &amp; Datenschutz
            </h3>
            <p className="text-[14px] text-ink-soft leading-relaxed">
              Wir nutzen nur technisch notwendige Cookies für Login und
              Session-Management. Optionale Cookies helfen uns, die Website zu
              verbessern. Mehr dazu in unserer{" "}
              <Link
                href="/datenschutz"
                className="text-accent underline underline-offset-4 hover:text-ink transition-colors"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => accept("essential")}
              className="btn btn-ghost text-[14px] flex-1 justify-center"
            >
              Nur notwendige
            </button>
            <button
              onClick={() => accept("all")}
              className="btn btn-accent text-[14px] flex-1 justify-center"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
