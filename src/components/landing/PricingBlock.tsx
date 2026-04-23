import Link from "next/link"

export default function PricingBlock() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="price">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">09 &nbsp;/&nbsp; Preis</div>
          <h2 className="sec-title">Ein Workshop. <em>Alles Wichtige drin.</em></h2>
          <p className="sec-lede">
            Inklusive Übernachtung, Verpflegung und persönlichem Support. Transparent und fair.
          </p>
        </div>

        <div className="reveal bg-ink text-bg border border-ink rounded-2xl p-10 max-w-[640px] mx-auto relative">
          <div className="absolute top-6 right-6 font-mono text-[11px] bg-accent text-accent-ink px-2.5 py-1.5 rounded-full tracking-label">
            WORKSHOP
          </div>
          <div className="font-mono text-xs tracking-wide uppercase mb-4" style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}>
            02.–04. Juli 2026
          </div>
          <div className="font-display text-[72px] font-normal leading-none tracking-[-0.03em] mb-1">
            <span className="text-[28px] align-[0.55em] mr-1">€</span>1.950
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

          <Link href="#signup" className="btn btn-lg btn-accent w-full justify-center mt-8">
            Jetzt bewerben →
          </Link>
        </div>
      </div>
    </section>
  )
}
