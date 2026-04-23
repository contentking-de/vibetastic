export default function WhatIsVibeCoding() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="what">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">01 &nbsp;/&nbsp; Konzept</div>
          <h2 className="sec-title">
            Vibecoding ist Programmieren <em>im Dialog.</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md-wide:grid-cols-[1.2fr_1fr] md-wide:gap-16 md-wide:items-start">
          <div className="reveal">
            <p className="text-xl leading-relaxed text-ink-soft mb-6" style={{ textWrap: "pretty" }}>
              Du musst keine Syntax auswendig lernen. Keine Kurse über Datentypen, Schleifen oder Build-Tools. Du beschreibst in normalem Deutsch oder Englisch,{" "}
              <b className="text-ink font-medium">was du bauen willst</b> — und die KI übersetzt das in lauffähigen Code.
            </p>
            <p className="text-xl leading-relaxed text-ink-soft mb-6" style={{ textWrap: "pretty" }}>
              Das nennt sich <b className="text-ink font-medium">Vibecoding</b>: ein Arbeitsfluss, bei dem du die Richtung vorgibst, immer wieder testest, und Stück für Stück echte Software entstehen lässt. Keine Illusion — echte Webseiten, echte Tools, echte Automatisierungen.
            </p>
            <p className="text-xl leading-relaxed text-ink-soft" style={{ textWrap: "pretty" }}>
              An diesem Workshop lernst du die Werkzeuge, die Denkweise und die Fallstricke. Am Ende hast du deine erste eigene Website gebaut, veröffentlicht und gezeigt.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-[1px] bg-line border border-line rounded-xl overflow-hidden">
            {[
              { num: "0", lab: "Vorkenntnisse nötig" },
              { num: "48h", lab: "Bis zur ersten Website" },
              { num: "3:5", lab: "Coach pro Gruppe" },
              { num: "∞", lab: "Ideen bauen lernen" },
            ].map((s) => (
              <div key={s.lab} className="bg-bg-card p-7">
                <div className="font-display text-5xl font-normal leading-none tracking-display text-ink">
                  {s.num}
                </div>
                <div className="mt-2.5 font-mono text-[11px] text-ink-mute tracking-[0.06em] uppercase">
                  {s.lab}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
