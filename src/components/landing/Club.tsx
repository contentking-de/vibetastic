const benefits = [
  {
    title: "Community-Austausch",
    text: "Stelle Fragen, teile Fortschritte und bekomme Feedback — von Teilnehmern und Experten, die genau verstehen, wo du stehst.",
  },
  {
    title: "Experten-Zugang",
    text: "Direkter Draht zu unseren Workshop-Leitern und Gast-Experten. Kein Ticket-System, keine Wartezeit — einfach fragen.",
  },
  {
    title: "Projekt-Feedback",
    text: "Zeig, woran du baust. Hol dir konkretes Feedback zu deinen Projekten — von Menschen, die wissen, worauf es ankommt.",
  },
  {
    title: "Ideen-Brainstorming",
    text: "Du hast eine Idee, aber weißt nicht, wo anfangen? Wirf sie in die Runde und bekomme Input, der dich weiterbringt.",
  },
  {
    title: "Exklusive Inhalte",
    text: "Neue Tutorials, Tool-Updates und Best Practices — kuratiert für die Community, nicht für die Masse.",
  },
  {
    title: "Netzwerk fürs Leben",
    text: "Lerne Menschen kennen, die wie du denken. Daraus entstehen Kooperationen, Aufträge und echte Freundschaften.",
  },
]

export default function Club() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="club">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">14 &nbsp;/&nbsp; Community</div>
          <h2 className="sec-title">
            Vibetastic Club — bleibe im Austausch mit <em>Teilnehmern &amp; Experten.</em>
          </h2>
          <p className="sec-lede">
            Dein Workshop-Ticket ist kein Einmal-Erlebnis. Du bekommst dauerhaften Zugang zum
            Vibetastic Club — unserer exklusiven Community, in der du dich jederzeit mit
            anderen Teilnehmern und den Experten austauschen, Fragen stellen und gemeinsam
            neue Ideen entwickeln kannst.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="reveal bg-bg-card border border-line rounded-[14px] p-7 flex flex-col gap-3"
            >
              <div className="font-display text-[20px] tracking-tight">
                {item.title}
              </div>
              <p className="text-[15px] text-ink-soft leading-relaxed" style={{ textWrap: "pretty" as React.CSSProperties["textWrap"] }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 p-8 bg-ink text-bg rounded-[14px] flex flex-col items-center text-center gap-4">
          <div className="font-mono text-[11px] tracking-label uppercase" style={{ color: "color-mix(in oklab, var(--bg) 55%, transparent)" }}>
            Im Ticket enthalten
          </div>
          <h3 className="font-display text-[clamp(24px,3vw,32px)] tracking-tight leading-tight">
            Einmal dabei, <em className="text-accent">für immer drin.</em>
          </h3>
          <p className="max-w-[520px] text-[15px]" style={{ color: "color-mix(in oklab, var(--bg) 70%, transparent)" }}>
            Der Zugang zum Vibetastic Club ist in deinem Workshop-Ticket enthalten —
            ohne Abo, ohne Zusatzkosten. Du bleibst Teil der Community, solange du willst.
          </p>
        </div>
      </div>
    </section>
  )
}
