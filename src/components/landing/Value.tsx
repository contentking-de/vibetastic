export default function Value() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">10 &nbsp;/&nbsp; Perspektive</div>
          <h2 className="sec-title">
            1.950 € klingen nach viel. <em>Sind sie nicht.</em>
          </h2>
          <p className="sec-lede">
            Vergleich es mit dem, was du sonst zahlen würdest — und was du danach selbst verdienen kannst.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md-wide:grid-cols-2 md-wide:gap-12">
          {/* Left: comparison */}
          <div className="reveal">
            <h3 className="font-display text-[28px] tracking-tight mb-6">
              Was kostet eine Website <em>ohne</em> Workshop?
            </h3>
            <div className="grid gap-[1px] bg-line border border-line rounded-xl overflow-hidden mb-6">
              {[
                { label: "Freelancer / Agentur", price: "3.000–15.000 €", note: "Einmalig, ohne dass du etwas lernst" },
                { label: "Baukasten + Rumfrickeln", price: "0 € + 40 h Frust", note: "Ergebnis: sieht auch so aus" },
                { label: "Online-Kurs (Udemy & Co.)", price: "15–200 €", note: "Abbruchquote > 90 %, kein Ergebnis" },
                { label: "Vibetastic Workshop", price: "1.950 €", note: "Fertige Website + Skills für immer", highlight: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`p-5 flex flex-col gap-1 ${row.highlight ? "bg-accent/10" : "bg-bg-card"}`}
                >
                  <div className="flex justify-between items-baseline gap-4">
                    <span className={`text-[15px] ${row.highlight ? "text-ink font-medium" : "text-ink-soft"}`}>
                      {row.label}
                    </span>
                    <span className={`font-mono text-sm shrink-0 ${row.highlight ? "text-accent font-medium" : "text-ink-mute"}`}>
                      {row.price}
                    </span>
                  </div>
                  <span className={`text-[13px] ${row.highlight ? "text-ink-soft" : "text-ink-mute"}`}>
                    {row.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: ROI */}
          <div className="reveal">
            <h3 className="font-display text-[28px] tracking-tight mb-6">
              Und was bringt dir das <em>danach?</em>
            </h3>
            <div className="space-y-5">
              {[
                {
                  title: "Eigene Projekte",
                  text: "Du brauchst nie wieder jemanden beauftragen, um eine Landing Page, ein Portfolio oder ein kleines SaaS-Tool zu bauen. Das spart dir tausende Euro — beim ersten Mal.",
                },
                {
                  title: "Kundenaufträge",
                  text: "Eine einfache Website für einen Kunden: 2.000–5.000 €. Nach dem Workshop kannst du das. Schon ein Auftrag zahlt dein Ticket mehr als zurück.",
                },
                {
                  title: "Karriere-Boost",
                  text: "Wer Webseiten bauen kann, wird in jedem Team wertvoller — ob Marketing, Produktmanagement oder Gründung. Das ist kein Hobby-Skill, das ist ein Hebel.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-bg-card border border-line rounded-xl p-6">
                  <div className="font-display text-[20px] tracking-tight mb-2">{item.title}</div>
                  <p className="text-[15px] text-ink-soft leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-ink text-bg rounded-xl">
              <div className="font-mono text-[11px] tracking-[0.04em] uppercase mb-3" style={{ color: "color-mix(in oklab, var(--bg) 60%, transparent)" }}>
                Beispielrechnung
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-y-2 gap-x-6 text-[15px]">
                <span>Workshop-Ticket</span>
                <span className="font-mono text-right">–1.950 €</span>
                <span>1 Website für einen Kunden</span>
                <span className="font-mono text-right text-accent">+3.500 €</span>
                <span>Eigene Website (statt Agentur)</span>
                <span className="font-mono text-right text-accent">+4.000 €</span>
                <div className="col-span-2 border-t border-line my-1" style={{ borderColor: "color-mix(in oklab, var(--bg) 20%, transparent)" }} />
                <span className="font-medium">Return on Investment</span>
                <span className="font-mono text-right text-accent font-medium">+5.550 €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
