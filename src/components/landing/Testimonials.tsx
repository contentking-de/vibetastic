const testimonials = [
  {
    quote: "Die Jungs haben mir beigebracht, wie ich meine Webseite selber gestalten kann — Design, Layout aber auch inhaltlich und vor allem funktional. Für mich ein echter Mehrwert und das gute Gefühl, nie wieder Web-Baukästen anfassen zu müssen.",
    name: "Lena K.",
    initials: "LK",
    role: "Heilpraktikerin, Leipzig",
  },
  {
    quote: "Endlich jemand, der diese Tools so erklärt, dass ich mich nicht direkt dumm fühle. Ich hab mir das von Nico in einer 3-Stunden-Session einmal zeigen lassen und 2 Wochen später das erste Projekt in Rechnung gestellt — für ein Dashboard, das ich an einem Wochenende gebaut habe.",
    name: "Jonas B.",
    initials: "JB",
    role: "Freelance-Coach, Berlin",
  },
  {
    quote: "Die Session mit Nico und Maya war ein echtes Geschenk. Kein Tech-Bro-Vibe, sehr strukturierter Aufbau mit kleinen Beispielen und vielen Anekdoten zwischen den Zeilen, die mir persönlich richtig weitergeholfen haben — nach knapp 4 Stunden war meine Webseite fertig.",
    name: "Sofia R.",
    initials: "SR",
    role: "Galerieassistentin, München",
  },
]

export default function Testimonials() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="testi">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">08 &nbsp;/&nbsp; Stimmen</div>
          <h2 className="sec-title">Was andere so darüber sagen.</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="reveal bg-bg-card border border-line rounded-[14px] p-7 flex flex-col gap-5"
            >
              <div className="font-display text-[22px] leading-[1.3] tracking-tight flex-1" style={{ textWrap: "pretty" }}>
                &ldquo;{t.quote}&rdquo;
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-ink flex items-center justify-center font-semibold text-[13px]">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-ink-mute">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
