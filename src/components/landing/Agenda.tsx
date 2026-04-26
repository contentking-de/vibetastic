const agendaItems = [
  {
    num: "01",
    title: "Die richtige Idee finden",
    desc: 'Wir helfen dir, aus einer vagen Vorstellung eine baubare Idee zu formen. Scope, Nutzen, "warum jetzt".',
  },
  {
    num: "02",
    title: "Prompten wie ein:e Entwickler:in",
    desc: 'Gute Prompts sind wie gute Briefings. Struktur, Kontext, Beispiele — und warum "schreib den Code" fast nie funktioniert.',
  },
  {
    num: "03",
    title: "Dein erster lauffähiger Prototyp",
    desc: "Wir gehen gemeinsam den Weg vom leeren Canvas zur klickbaren Seite. Live, ohne Magie.",
  },
  {
    num: "04",
    title: "Daten, Login und echte Funktionen",
    desc: "Formulare speichern, Nutzer:innen einloggen, E-Mails verschicken. Die unsichtbaren 80 %, die aus einer statischen Seite eine richtige Website machen.",
  },
  {
    num: "05",
    title: "Veröffentlichen & teilen",
    desc: "Domain, Hosting, einfaches Deployment. Von localhost zu einer URL, die du deinen Freunden schickst.",
  },
  {
    num: "06",
    title: "Wenn es kaputt geht",
    desc: "Debugging-Basics, Sicherheitsfallen, KI-Halluzinationen erkennen, und wann du jemanden fragen solltest.",
  },
]

export default function Agenda() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="agenda">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">02 &nbsp;/&nbsp; Was du lernst</div>
          <h2 className="sec-title">
            Sechs Bausteine, die dich vom <em>Zuschauer</em> zum <em>Builder</em> machen.
          </h2>
        </div>
        <div className="reveal border-t border-line">
          {agendaItems.map((item) => (
            <div
              key={item.num}
              className="grid grid-cols-[60px_1fr] gap-6 py-7 border-b border-line items-start transition-[padding] duration-300 hover:pl-3"
            >
              <div className="font-mono text-[13px] text-ink-mute">{item.num}</div>
              <div>
                <div className="font-display text-[28px] font-normal tracking-tight mb-1.5">
                  {item.title}
                </div>
                <div className="text-ink-soft text-[15px] max-w-[620px]">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
