"use client"

import Link from "next/link"
import { useEffect, useState, useCallback } from "react"

type SpotData = {
  event: {
    title: string
    dateStart: string
    dateEnd: string
    location: string
    maxSpots: number
    priceNet: number
  } | null
  taken: number
  remaining: number
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.toLocaleDateString("de-DE", { day: "2-digit", month: "long" })}–${e.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}`
}

export default function PricingBlock() {
  const [spots, setSpots] = useState<SpotData | null>(null)

  const fetchSpots = useCallback(async () => {
    try {
      const res = await fetch("/api/spots")
      if (res.ok) setSpots(await res.json())
    } catch { /* silent */ }
  }, [])

  useEffect(() => { fetchSpots() }, [fetchSpots])

  const event = spots?.event
  const isWaitlist = !event || (spots?.remaining ?? 0) <= 0

  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="price">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">10 &nbsp;/&nbsp; Preis</div>
          <h2 className="sec-title">Ein Workshop. <em>Alles Wichtige drin.</em></h2>
          <p className="sec-lede">
            Inklusive Übernachtung, Verpflegung und persönlichem Support. Transparent und fair.
          </p>
        </div>

        <div className="reveal bg-ink text-bg border border-ink rounded-2xl p-10 max-w-[640px] mx-auto relative">
          {spots && (
            <div className={`absolute top-6 right-6 font-mono text-[11px] px-2.5 py-1.5 rounded-full tracking-label font-bold ${
              isWaitlist ? "bg-red-500 text-white" : "bg-accent text-accent-ink"
            }`}>
              {isWaitlist ? "AUSGEBUCHT" : `${spots.remaining} PLÄTZE FREI`}
            </div>
          )}
          <div className="font-mono text-xs tracking-wide uppercase mb-4" style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}>
            {event ? formatDateRange(event.dateStart, event.dateEnd) : "Termin folgt"}
          </div>
          <div className="font-display text-[72px] font-normal leading-none tracking-[-0.03em] mb-1">
            <span className="text-[28px] align-[0.55em] mr-1">€</span>
            {event ? event.priceNet.toLocaleString("de-DE") : "1.950"}
          </div>
          <div className="text-sm mb-8" style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}>
            pro Person &middot; netto zzgl. 19% MwSt.
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] tracking-label uppercase mb-4" style={{ color: "color-mix(in oklab, var(--bg) 55%, transparent)" }}>
                Inklusive
              </div>
              <ul className="grid gap-3">
                {[
                  "2 Übernachtungen im Einzelzimmer",
                  "Komplette Verpflegung inkl. Getränke",
                  "1:1 Support durch das Host-Team",
                  "2 volle Workshop-Tage + Anreiseabend",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[15px] flex gap-2.5 items-start"
                  >
                    <span className="font-mono text-accent shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-label uppercase mb-4" style={{ color: "color-mix(in oklab, var(--bg) 55%, transparent)" }}>
                Nicht inklusive
              </div>
              <ul className="grid gap-3">
                {[
                  "Anreise und Abreise",
                  "Zugang zu Tools & Programme (mögliche Kosten)",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[15px] flex gap-2.5 items-start"
                    style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}
                  >
                    <span className="font-mono shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {isWaitlist ? (
            <>
              <Link href="#signup" className="btn btn-lg btn-accent w-full justify-center mt-8">
                Auf die Warteliste →
              </Link>
              <p className="text-center text-sm mt-3" style={{ color: "color-mix(in oklab, var(--bg) 55%, transparent)" }}>
                Alle Plätze sind vergeben. Trag dich auf die Warteliste ein.
              </p>
            </>
          ) : (
            <>
              <Link href="#signup" className="btn btn-lg btn-accent w-full justify-center mt-8">
                Jetzt Platz sichern →
              </Link>
              <p className="text-center text-sm mt-3" style={{ color: "color-mix(in oklab, var(--bg) 55%, transparent)" }}>
                Nur {spots!.remaining} von {event!.maxSpots} Plätzen verfügbar. Sichere dir deinen Platz.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
