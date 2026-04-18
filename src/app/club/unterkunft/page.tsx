export default function UnterkunftPage() {
  const hotels = [
    {
      name: "Hotel Schöne Aussicht",
      distance: "500m vom Workshop-Ort",
      price: "ab 89€/Nacht",
      description:
        "Modernes Boutique-Hotel mit ruhiger Lage. Frühstück inklusive. Ideal für Teilnehmer, die es bequem mögen.",
      url: "#",
    },
    {
      name: "Gasthof zum Guten Vibe",
      distance: "1,2 km vom Workshop-Ort",
      price: "ab 65€/Nacht",
      description:
        "Gemütlicher Gasthof mit regionalem Charme. Gutes Preis-Leistungs-Verhältnis und herzlicher Service.",
      url: "#",
    },
    {
      name: "City Apartments",
      distance: "800m vom Workshop-Ort",
      price: "ab 75€/Nacht",
      description:
        "Moderne Apartments mit kleiner Küche. Perfekt für alle, die Unabhängigkeit schätzen.",
      url: "#",
    },
    {
      name: "Pension Am Park",
      distance: "1,5 km vom Workshop-Ort",
      price: "ab 55€/Nacht",
      description:
        "Einfach, sauber und günstig. Ideal für Budget-bewusste Teilnehmer. Bushaltestelle direkt vor der Tür.",
      url: "#",
    },
  ]

  return (
    <div>
      <div className="mb-12">
        <p className="label-meta mb-2">Unterkunft</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Übernachtungsmöglichkeiten
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Wir haben eine Auswahl an Hotels und Unterkünften in der Nähe des
          Workshop-Ortes für dich zusammengestellt.
        </p>
      </div>

      <div className="space-y-6">
        {hotels.map((hotel) => (
          <div key={hotel.name} className="card-floating">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-on-surface mb-1">
                  {hotel.name}
                </h3>
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="text-xs bg-surface-container-low px-3 py-1 rounded-full text-on-surface-variant">
                    {hotel.distance}
                  </span>
                  <span className="text-xs bg-secondary-container px-3 py-1 rounded-full text-on-secondary-container">
                    {hotel.price}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {hotel.description}
                </p>
              </div>
              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm !px-6 !py-2 shrink-0"
              >
                Buchen
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card">
        <p className="text-sm text-on-surface-variant">
          <strong className="text-on-surface">Tipp:</strong> Buche früh! Die
          Unterkünfte in der Nähe sind oft schnell ausgebucht. Für Fragen zu
          Unterkünften erreichst du uns unter{" "}
          <a
            href="mailto:hallo@vibetastic.de"
            className="text-primary underline underline-offset-4"
          >
            hallo@vibetastic.de
          </a>
          .
        </p>
      </div>
    </div>
  )
}
