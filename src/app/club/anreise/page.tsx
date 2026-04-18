export default function AnreisePage() {
  return (
    <div>
      <div className="mb-12">
        <p className="label-meta mb-2">Anreise</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          So kommst du zum Workshop
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Alle wichtigen Informationen zur Anreise auf einen Blick.
        </p>
      </div>

      <div className="card-floating mb-6">
        <p className="label-meta mb-2">Workshop-Adresse</p>
        <p className="text-xl font-semibold text-on-surface">
          Workshop-Location
        </p>
        <p className="text-on-surface-variant mt-1">
          Musterstraße 42, 10115 Berlin
        </p>
        <p className="text-sm text-on-surface-variant mt-1">
          Genaue Adresse wird rechtzeitig per E-Mail bekannt gegeben.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card-floating">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <h3 className="text-lg font-semibold text-on-surface">
              Mit der Bahn
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-on-surface text-sm">Nächster Bahnhof</p>
              <p className="text-sm text-on-surface-variant">
                Hauptbahnhof (ca. 15 Minuten zu Fuß oder 2 Stationen mit der U-Bahn)
              </p>
            </div>
            <div>
              <p className="font-medium text-on-surface text-sm">Verbindung</p>
              <p className="text-sm text-on-surface-variant">
                Vom Hauptbahnhof mit der U6 bis Station Friedrichstraße, dann
                5 Minuten zu Fuß.
              </p>
            </div>
            <div>
              <p className="font-medium text-on-surface text-sm">Tipp</p>
              <p className="text-sm text-on-surface-variant">
                Buche ein Deutschland-Ticket für flexible Nutzung des ÖPNV
                während deines Aufenthalts.
              </p>
            </div>
          </div>
        </div>

        <div className="card-floating">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h2.25m0 0V6.375a1.125 1.125 0 011.125-1.125h4.5A1.125 1.125 0 0112.375 6.375v7.875m-6.75 0h6.75m.75 0h3.075a1.125 1.125 0 011.012.643l1.588 3.175a1.125 1.125 0 01-.363 1.307l-.707.495a1.125 1.125 0 01-1.087.087l-2.268-1.011a1.125 1.125 0 00-.92 0L14.25 18.75" />
            </svg>
            <h3 className="text-lg font-semibold text-on-surface">
              Mit dem Auto
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-on-surface text-sm">Anfahrt</p>
              <p className="text-sm text-on-surface-variant">
                Über die A100, Ausfahrt Zentrum. Navigation zu
                &quot;Musterstraße 42&quot; eingeben.
              </p>
            </div>
            <div>
              <p className="font-medium text-on-surface text-sm">Parken</p>
              <p className="text-sm text-on-surface-variant">
                Parkhaus direkt um die Ecke (ca. 12€/Tag). Straßenparkplätze
                sind begrenzt verfügbar.
              </p>
            </div>
            <div>
              <p className="font-medium text-on-surface text-sm">Tipp</p>
              <p className="text-sm text-on-surface-variant">
                Fahrgemeinschaften sind willkommen! Schreib in der Community,
                wenn du jemanden mitnehmen oder mitfahren möchtest.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-sm text-on-surface-variant">
          <strong className="text-on-surface">Fragen zur Anreise?</strong>{" "}
          Schreib uns an{" "}
          <a
            href="mailto:hallo@vibetastic.de"
            className="text-primary underline underline-offset-4"
          >
            hallo@vibetastic.de
          </a>{" "}
          und wir helfen dir gerne weiter.
        </p>
      </div>
    </div>
  )
}
