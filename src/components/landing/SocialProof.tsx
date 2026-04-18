export default function SocialProof() {
  const stats = [
    { number: "10k+", label: "Community Mitglieder" },
    { number: "500+", label: "Projekte erstellt" },
    { number: "4.9/5", label: "Workshop-Bewertung" },
  ]

  return (
    <section className="bg-surface-container-low py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-meta text-center mb-12">
          Bekannt aus der Community
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold tracking-display text-on-surface mb-2">
                {stat.number}
              </p>
              <p className="text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {[
            "\"Vibe Coding hat meine Sichtweise aufs Programmieren komplett verändert.\"",
            "\"Endlich eine Methode, die Spaß macht und Ergebnisse liefert.\"",
            "\"In 2 Tagen mehr gelernt als in Monaten Selbststudium.\"",
          ].map((quote, i) => (
            <div key={i} className="card-floating max-w-xs">
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
