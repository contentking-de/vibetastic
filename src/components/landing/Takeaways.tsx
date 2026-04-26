const takeaways = [
  {
    title: "Digitale Unabhängigkeit",
    text: "Du brauchst keine Agentur, keinen Entwickler, keinen Baukasten. Nach dem Workshop kannst du deine eigene Website bauen, ändern und weiterentwickeln — wann immer du willst.",
  },
  {
    title: "KI als Werkzeug beherrschen",
    text: "Die Welt verändert sich rasant. Wer KI-Tools wirklich versteht und produktiv einsetzen kann, hat einen massiven Vorteil — beruflich und persönlich.",
  },
  {
    title: "Ein echtes, professionelles Setup",
    text: "Kein Spielzeug, keine Demo. Du gehst mit einem professionellen Entwickler-Setup nach Hause, das du sofort für eigene Projekte oder Kunden nutzen kannst.",
  },
  {
    title: "Vom Konsumenten zum Macher",
    text: "Statt Technologie nur zu nutzen, lernst du sie zu gestalten. Das verändert, wie du Probleme angehst — und welche Möglichkeiten du plötzlich siehst.",
  },
  {
    title: "Skills, die bleiben",
    text: "Kein Einmal-Workshop, den du vergisst. Du lernst eine Vorgehensweise, die du auf jedes neue Projekt anwenden kannst — egal was morgen kommt.",
  },
  {
    title: "Zukunftssicher aufgestellt",
    text: "In einer Welt, in der sich Branchen über Nacht verändern, ist digitale Kompetenz kein Nice-to-have — sondern deine Versicherung.",
  },
]

export default function Takeaways() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="takeaways">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">07 &nbsp;/&nbsp; Dein Vorteil</div>
          <h2 className="sec-title">
            100 % digitale Befähigung — <em>was du mitnimmst.</em>
          </h2>
          <p className="sec-lede">
            Die Welt wird nicht langsamer. Wer heute lernt, KI-Tools souverän einzusetzen, bleibt unabhängig, relevant und handlungsfähig — egal wie sich der Markt verändert.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {takeaways.map((t) => (
            <div
              key={t.title}
              className="reveal bg-bg-card border border-line rounded-[14px] p-7 flex flex-col gap-3"
            >
              <div className="font-display text-[20px] tracking-tight">
                {t.title}
              </div>
              <p className="text-[15px] text-ink-soft leading-relaxed" style={{ textWrap: "pretty" }}>
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
