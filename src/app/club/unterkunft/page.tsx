export default function UnterkunftPage() {
  return (
    <div>
      <div className="mb-12">
        <p className="label-meta mb-2">Unterkunft</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Deine Unterkunft ist inklusive
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Die Übernachtung ist im Workshop-Preis inbegriffen — du brauchst
          dich um nichts zu kümmern.
        </p>
      </div>

      <div className="card-floating mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-on-surface">
              Hotel &amp; Restaurant Bürgerstuben
            </h2>
            <p className="text-on-surface-variant mt-1">
              Direkt am Bahnhof Markdorf — nur wenige Schritte von der Workshop-Location entfernt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-medium text-on-surface text-sm mb-1">Zimmer</p>
            <p className="text-sm text-on-surface-variant">
              Moderne, frisch renovierte Zimmer. Alle Teilnehmer sind gemeinsam
              im Hotel untergebracht.
            </p>
          </div>
          <div>
            <p className="font-medium text-on-surface text-sm mb-1">Frühstück</p>
            <p className="text-sm text-on-surface-variant">
              Jeden Morgen gibt es ein tolles Frühstück im Restaurant — für
              alle Teilnehmer inklusive.
            </p>
          </div>
          <div>
            <p className="font-medium text-on-surface text-sm mb-1">Mittagessen</p>
            <p className="text-sm text-on-surface-variant">
              Mittags gehen wir gemeinsam in die Bürgerstuben zum Essen.
              Gut gestärkt zurück in den Workshop.
            </p>
          </div>
        </div>
      </div>

      <div className="card-floating mb-6">
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Die Bürgerstuben sind ein familiengeführtes Hotel-Restaurant mit
          regionaler Küche und einem schönen Biergarten unter alten Kastanien.
          Mehr Infos findest du auf der{" "}
          <a
            href="https://www.restaurant-buergerstuben.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Website der Bürgerstuben
          </a>
          .
        </p>
      </div>

      <div className="card">
        <p className="text-sm text-on-surface-variant">
          <strong className="text-on-surface">Fragen zur Unterkunft?</strong>{" "}
          Schreib uns an{" "}
          <a
            href="mailto:maya@vibetastic.de"
            className="text-primary underline underline-offset-4"
          >
            maya@vibetastic.de
          </a>{" "}
          und wir helfen dir gerne weiter.
        </p>
      </div>
    </div>
  )
}
