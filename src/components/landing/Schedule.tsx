const day1 = [
  { time: "09:00", what: "Ankunft & Frühstück", detail: "Kaffee, Croissants, erstes Kennenlernen" },
  { time: "10:00", what: "Kick-off", detail: "Was ist Vibecoding, was nicht, und warum jetzt" },
  { time: "11:00", what: "Ideenfindung", detail: "Wir formen deine Website-Idee — ohne Tech-Buzzwords" },
  { time: "13:00", what: "Mittagessen", detail: "Aus der Region, gemeinsam am großen Tisch" },
  { time: "14:30", what: "Erste Website, erste Hürde", detail: "Live mit Cursor, Claude & Co. bauen" },
  { time: "17:30", what: "Wrap & Spaziergang", detail: "Kurze Reflexion, dann raus in Markdorf" },
  { time: "19:30", what: "Abendessen am Kamin", detail: "Dreigängig, ausreichend Wein" },
]

const day2 = [
  { time: "08:30", what: "Frühstück", detail: "Optional: morgendliche Runde um den See" },
  { time: "09:30", what: "Daten & Logins", detail: "Deine Website lernt, Dinge zu merken" },
  { time: "12:00", what: "Open Build", detail: "Du baust, wir supporten — 1:1, so viel du brauchst" },
  { time: "13:30", what: "Mittagessen", detail: "Leicht, damit der Nachmittag weitergeht" },
  { time: "14:30", what: "Veröffentlichen", detail: "Domain kaufen, Deploy, live gehen" },
  { time: "16:30", what: "Demo-Runde", detail: "Jede:r zeigt die Website in 3 Minuten" },
  { time: "17:30", what: "Abschluss & Abreise", detail: "Mit Kaffee, Kuchen, neuen Kontakten" },
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
            Zwei Tage, <em>wie gemacht</em> fürs Reinkommen.
          </h2>
          <p className="sec-lede">
            Strukturierte Sessions, gemeinsame Mahlzeiten, viel Zeit zum Bauen. Keine stundenlangen Vorträge.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md-wide:grid-cols-2">
          <DayCard title="Tag 1 — Aufbrechen" date="SAMSTAG, 15. NOV." rows={day1} />
          <DayCard title="Tag 2 — Ausliefern" date="SONNTAG, 16. NOV." rows={day2} />
        </div>
      </div>
    </section>
  )
}
