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

const tools = [
  { name: "Claude", desc: "KI-Assistent" },
  { name: "Cursor", desc: "Code-Editor" },
  { name: "Vercel", desc: "Hosting" },
  { name: "Neon", desc: "Datenbank" },
  { name: "GitHub", desc: "Versionierung" },
  { name: "Resend", desc: "E-Mails" },
]

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

function DayCard({ title, date, rows }: { title: string; date: string; rows: typeof day1 }) {
  return (
    <div className="card-floating">
      <div className="flex justify-between items-baseline border-b border-outline-variant/20 pb-4 mb-4">
        <h3 className="text-base font-bold text-on-surface">{title}</h3>
        <span className="text-xs font-mono text-on-surface-variant">{date}</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.time}
          className={`grid grid-cols-[70px_1fr] gap-4 py-3 ${
            i < rows.length - 1 ? "border-b border-dashed border-outline-variant/20" : ""
          }`}
        >
          <span className="text-sm font-mono text-primary pt-0.5">{row.time}</span>
          <div>
            <p className="text-sm font-medium text-on-surface">{row.what}</p>
            <p className="text-sm text-on-surface-variant mt-0.5">{row.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function WorkshopPage() {
  return (
    <div>
      <div className="mb-12">
        <p className="label-meta mb-2">Workshop-Programm</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Agenda & Inhalte
        </h1>
        <p className="mt-3 text-on-surface-variant max-w-2xl">
          Vibecoding ist Programmieren im Dialog. Du beschreibst, was du bauen willst —
          die KI übersetzt das in lauffähigen Code. Hier siehst du, was dich erwartet.
        </p>
      </div>

      {/* Was du lernst */}
      <div className="mb-12">
        <h2 className="text-sm font-bold text-on-surface mb-6 uppercase tracking-wider opacity-60">
          Was du lernst — 6 Bausteine
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {agendaItems.map((item) => (
            <div key={item.num} className="card-floating">
              <span className="text-xs font-mono text-primary">{item.num}</span>
              <h3 className="text-base font-bold text-on-surface mt-2 mb-2">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ablauf */}
      <div className="mb-12">
        <h2 className="text-sm font-bold text-on-surface mb-2 uppercase tracking-wider opacity-60">
          Ablauf — 3 Tage
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Donnerstagabend ankommen, Freitag und Samstag intensiv bauen.
          Gemeinsame Mahlzeiten, viel Zeit zum Coden.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DayCard title="Anreise" date="DO, 02. JUL." rows={dayAnreise} />
          <DayCard title="Tag 1 — Aufbrechen" date="FR, 03. JUL." rows={day1} />
          <DayCard title="Tag 2 — Ausliefern" date="SA, 04. JUL." rows={day2} />
        </div>
      </div>

      {/* Tools */}
      <div className="mb-12">
        <h2 className="text-sm font-bold text-on-surface mb-2 uppercase tracking-wider opacity-60">
          Deine Werkzeuge
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Professionelle Tools, die du nach dem Workshop weiternutzt.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="card-floating text-center py-6">
              <p className="text-base font-bold text-on-surface">{tool.name}</p>
              <p className="text-xs font-mono text-on-surface-variant mt-1 uppercase">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Takeaways */}
      <div>
        <h2 className="text-sm font-bold text-on-surface mb-2 uppercase tracking-wider opacity-60">
          Was du mitnimmst
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Die Welt wird nicht langsamer. Wer heute lernt, KI-Tools souverän einzusetzen,
          bleibt unabhängig, relevant und handlungsfähig.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {takeaways.map((t) => (
            <div key={t.title} className="card-floating">
              <h3 className="text-base font-bold text-on-surface mb-2">{t.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
