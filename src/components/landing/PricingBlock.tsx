import Link from "next/link"

export default function PricingBlock() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="price">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">09 &nbsp;/&nbsp; Preise</div>
          <h2 className="sec-title">Ein Preis. <em>Alles drin.</em></h2>
          <p className="sec-lede">
            Inklusive Übernachtung, Verpflegung und allen Tool-Kosten während des Workshops. Keine versteckten Posten.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md-wide:grid-cols-2 md-wide:gap-8">
          {/* Standard (featured) */}
          <div className="reveal bg-ink text-bg border border-ink rounded-2xl p-10 relative">
            <div className="absolute top-6 right-6 font-mono text-[11px] bg-accent text-accent-ink px-2.5 py-1.5 rounded-full tracking-label">
              STANDARD
            </div>
            <div className="font-mono text-xs tracking-wide uppercase mb-4" style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}>
              2-tägiges Retreat
            </div>
            <div className="font-display text-[72px] font-normal leading-none tracking-[-0.03em] mb-1">
              <span className="text-[28px] align-[0.55em] mr-1">€</span>1.790
            </div>
            <div className="text-sm mb-7" style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}>
              pro Person &middot; inkl. Übernachtung &middot; zzgl. 19% MwSt.
            </div>
            <ul className="grid gap-3 mb-8">
              {[
                "2 volle Workshop-Tage in der Contentking Agentur",
                "Alle Mahlzeiten & Getränke aus der Region",
                "Einzelzimmer mit Blick in den Wald",
                "Tool-Zugänge für die Workshop-Zeit",
                "1:1 Support nach Bedarf (max. 4 TN / Coach)",
                "30 Tage Nachbetreuung per E-Mail",
              ].map((item) => (
                <li
                  key={item}
                  className="text-[15px] flex gap-2.5 items-start pb-3"
                  style={{ borderBottom: "1px solid color-mix(in oklab, var(--bg) 15%, transparent)" }}
                >
                  <span className="font-mono text-accent shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="#signup" className="btn btn-lg btn-accent w-full justify-center">
              Platz sichern →
            </Link>
          </div>

          {/* Team */}
          <div className="reveal bg-bg-card border border-line rounded-2xl p-10 relative">
            <div className="font-mono text-xs tracking-wide uppercase text-ink-mute mb-4">
              Team / Gemeinsam
            </div>
            <div className="font-display text-[72px] font-normal leading-none tracking-[-0.03em] mb-1">
              <span className="text-[28px] align-[0.55em] mr-1">€</span>1.590
            </div>
            <div className="text-sm text-ink-mute mb-7">
              pro Person ab 2 Personen &middot; zzgl. 19% MwSt.
            </div>
            <ul className="grid gap-3 mb-8">
              {[
                "Alles aus Standard",
                "Doppelzimmer-Option auf Wunsch",
                "Gemeinsames Ideenfindungs-Briefing vorher",
                "Ideal für Co-Founder, Paare, befreundete Teams",
                "Flexibel auf 2–4 Personen anwendbar",
              ].map((item) => (
                <li
                  key={item}
                  className="text-[15px] flex gap-2.5 items-start pb-3 border-b border-line"
                >
                  <span className="font-mono text-accent shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="#signup" className="btn btn-lg btn-ghost w-full justify-center">
              Anfragen →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
