const dayAnreise = [
  { time: "ab 17:00", what: "Anreise & Einchecken", detail: "Zimmer beziehen, ankommen, durchatmen" },
  { time: "18:30", what: "Kennenlernen & Setup", detail: "Lockeres Get-together, Laptops einrichten, Fragen klären" },
  { time: "19:30", what: "Gemeinsames Abendessen", detail: "Entspannt den Abend ausklingen lassen" },
]

const day1 = [
  { time: "08:30", what: "Frühstück", detail: "Gemeinsam in den Tag starten" },
  { time: "09:30", what: "Kick-off & Theorie", detail: "Was ist Vibecoding, was nicht, und warum es funktioniert" },
  { time: "11:00", what: "Ideenfindung", detail: "Wir formen deine Website-Idee — ohne Tech-Buzzwords" },
  { time: "13:00", what: "Mittagessen", detail: "Aus der Region, gemeinsam am großen Tisch" },
  { time: "14:30", what: "Praxisteil: Bauen", detail: "Live mit Cursor, Claude & Co. — vom leeren Canvas zur ersten Seite" },
  { time: "19:00", what: "Abendessen", detail: "Gemeinsam essen, den Tag Revue passieren lassen" },
]

const day2 = [
  { time: "08:30", what: "Frühstück", detail: "Energie für den letzten Tag" },
  { time: "09:30", what: "Reflexion & Weiterarbeiten", detail: "Kurzer Rückblick, dann weiter am Projekt" },
  { time: "13:00", what: "Mittagessen", detail: "Leicht, damit der Nachmittag weitergeht" },
  { time: "14:00", what: "Projekt fertigstellen", detail: "Letzte Features, Feinschliff, Veröffentlichen" },
  { time: "16:00", what: "Demo-Runde", detail: "Jede:r zeigt die Website in 3 Minuten" },
  { time: "17:00", what: "Abschluss & Abreise", detail: "Feedback, Kontakte tauschen, Abschied" },
]

function DayCard({
  title,
  date,
  rows,
}: {
  title: string
  date: string
  rows: typeof day1
}) {
  return (
    <div className="reveal bg-bg-card border border-line rounded-[14px] p-8">
      <div className="flex justify-between items-baseline border-b border-line pb-5 mb-5">
        <div className="font-display text-[32px] font-normal tracking-tight">{title}</div>
        <div className="font-mono text-xs text-ink-mute">{date}</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.time}
          className={`grid grid-cols-[80px_1fr] gap-[18px] py-3.5 ${
            i < rows.length - 1 ? "border-b border-dashed border-line" : ""
          }`}
        >
          <div className="font-mono text-xs text-ink-mute pt-[2px]">{row.time}</div>
          <div className="text-[15px] text-ink">
            {row.what}
            <small className="block text-ink-mute text-[13px] mt-[2px]">{row.detail}</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Schedule() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="schedule">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">03 &nbsp;/&nbsp; Ablauf</div>
          <h2 className="sec-title">
            Drei Tage, <em>wie gemacht</em> fürs Reinkommen.
          </h2>
          <p className="sec-lede">
            Donnerstagabend ankommen, Freitag und Samstag intensiv bauen. Gemeinsame Mahlzeiten, viel Zeit zum Coden.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md-wide:grid-cols-3">
          <DayCard title="Anreise" date="DONNERSTAG, 02. JUL." rows={dayAnreise} />
          <DayCard title="Tag 1 — Aufbrechen" date="FREITAG, 03. JUL." rows={day1} />
          <DayCard title="Tag 2 — Ausliefern" date="SAMSTAG, 04. JUL." rows={day2} />
        </div>
      </div>
    </section>
  )
}
