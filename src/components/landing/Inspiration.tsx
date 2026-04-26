const inspirations = [
  {
    category: "Business",
    title: "Deine eigene Landing Page",
    text: "Professionelle Website für dein Angebot — mit Kontaktformular, SEO und mobilem Design. In wenigen Stunden statt Wochen.",
  },
  {
    category: "E-Commerce",
    title: "Ein digitaler Shop",
    text: "Produkte präsentieren, Zahlungen abwickeln, Bestellungen verwalten. Alles selbst gebaut, ohne monatliche Plattformgebühren.",
  },
  {
    category: "SaaS",
    title: "Online-Tools aller Art",
    text: "Ob Rechner, Buchungssystem oder Kundenverwaltung — du kannst eigene Mini-Apps bauen und sogar verkaufen.",
  },
  {
    category: "Portfolio",
    title: "Dein persönliches Portfolio",
    text: "Zeig der Welt, was du kannst. Eine individuelle Seite, die genau so aussieht, wie du es willst — kein Template-Einheitsbrei.",
  },
  {
    category: "Freelance",
    title: "Websites für Kunden",
    text: "Mit deinem neuen Setup kannst du Aufträge annehmen. Eine Website für einen Kunden bringt schnell 2.000–5.000 €.",
  },
  {
    category: "Community",
    title: "Plattform für dein Netzwerk",
    text: "Blog, Mitgliederbereich, Newsletter-Anmeldung oder Event-Seite — bau dir eine Homebase für deine Community.",
  },
  {
    category: "Automatisierung",
    title: "Workflows & Dashboards",
    text: "Verbinde APIs, automatisiere Abläufe und baue dir interne Tools, die dir im Alltag Stunden sparen.",
  },
  {
    category: "Non-Profit",
    title: "Seiten für Vereine & Initiativen",
    text: "Vereinswebsite, Spendenformular oder Event-Kalender — hilf anderen, ohne ein Budget für Entwickler zu brauchen.",
  },
  {
    category: "Prototyping",
    title: "MVP für deine Startup-Idee",
    text: "Teste deine Geschäftsidee mit einem klickbaren Prototyp, bevor du Geld investierst. In Tagen statt Monaten.",
  },
]

export default function Inspiration() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="inspiration">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">13 &nbsp;/&nbsp; Inspiration</div>
          <h2 className="sec-title">
            200 % Inspiration — <em>das kannst du danach selber bauen.</em>
          </h2>
          <p className="sec-lede">
            Der Workshop gibt dir nicht nur Skills, sondern öffnet dir die Tür zu einer ganzen Welt an Projekten. Hier ein kleiner Vorgeschmack.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {inspirations.map((item) => (
            <div
              key={item.title}
              className="reveal bg-bg-card border border-line rounded-[14px] p-7 flex flex-col gap-3"
            >
              <div
                className="font-mono text-[11px] tracking-label uppercase"
                style={{ color: "color-mix(in oklab, var(--ink) 50%, transparent)" }}
              >
                {item.category}
              </div>
              <div className="font-display text-[20px] tracking-tight">
                {item.title}
              </div>
              <p className="text-[15px] text-ink-soft leading-relaxed" style={{ textWrap: "pretty" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
