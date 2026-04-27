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
          contentking.de Agentur
        </p>
        <p className="text-on-surface-variant mt-1">
          Eisenbahnstraße 1, 88677 Markdorf
        </p>
        <p className="text-sm text-on-surface-variant mt-1">
          Direkt im Bahnhof Markdorf — vom Bahnsteig sind es 20&nbsp;m bis zu den Räumlichkeiten. Aussteigen und ankommen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="font-medium text-on-surface text-sm">Bahnhof Markdorf</p>
              <p className="text-sm text-on-surface-variant">
                Die Workshop-Location ist direkt im Bahnhof. Vom Bahnsteig bis zur Tür sind es nur 20&nbsp;m — einfacher geht&rsquo;s nicht.
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <h3 className="text-lg font-semibold text-on-surface">
              Mit dem Flugzeug
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-on-surface text-sm">Flughafen Friedrichshafen</p>
              <p className="text-sm text-on-surface-variant">
                Der nächste Flughafen ist Friedrichshafen (FDH), ca. 20&nbsp;km entfernt.
              </p>
            </div>
            <div>
              <p className="font-medium text-on-surface text-sm">Tipp</p>
              <p className="text-sm text-on-surface-variant">
                Donnerstags gibt es günstige Flüge von Düsseldorf nach Friedrichshafen mit Air Uniqon.
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
              <p className="font-medium text-on-surface text-sm">Von Westen (Stuttgart)</p>
              <p className="text-sm text-on-surface-variant">
                Über die A81 Richtung Singen, dann Ausfahrt Richtung Lindau/Überlingen auf die B33/B31 nach Markdorf.
              </p>
            </div>
            <div>
              <p className="font-medium text-on-surface text-sm">Von Osten (München)</p>
              <p className="text-sm text-on-surface-variant">
                Über die A96 bis Lindau, dann auf die B31 Richtung Friedrichshafen/Überlingen nach Markdorf.
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
