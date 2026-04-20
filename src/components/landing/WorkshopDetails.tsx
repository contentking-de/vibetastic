import Link from "next/link"

export default function WorkshopDetails() {
  const agenda = [
    {
      day: "Tag 1",
      title: "Grundlagen & Erste Projekte",
      items: [
        "Einführung in Vibe Coding",
        "Setup deiner KI-Toolchain",
        "Dein erstes Projekt von der Idee bis zum Deploy",
        "Hands-on: Landing Pages & Web Apps",
      ],
    },
    {
      day: "Tag 2",
      title: "Fortgeschritten & Eigenes Projekt",
      items: [
        "Fortgeschrittene Prompting-Techniken",
        "Datenbanken & APIs mit KI integrieren",
        "Eigenes Projekt bauen & präsentieren",
        "Q&A und nächste Schritte",
      ],
    },
  ]

  return (
    <section id="workshop" className="py-24 md:py-32 bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="label-meta mb-4">Der Workshop</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight">
            2 Tage, die alles ändern
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card-floating">
            <p className="label-meta mb-2">Wann</p>
            <p className="text-lg font-semibold text-on-surface">
              Sa–So, TBD 2025
            </p>
            <p className="text-sm text-on-surface-variant mt-1">
              jeweils 9:00 – 17:00 Uhr
            </p>
          </div>
          <div className="card-floating">
            <p className="label-meta mb-2">Wo</p>
            <p className="text-lg font-semibold text-on-surface">
              contentking.de Agentur
            </p>
            <p className="text-sm text-on-surface-variant mt-1">
              Eisenbahnstrasse 1, 88677 Markdorf
            </p>
          </div>
          <div className="card-floating">
            <p className="label-meta mb-2">Format</p>
            <p className="text-lg font-semibold text-on-surface">
              Vor Ort & Hands-on
            </p>
            <p className="text-sm text-on-surface-variant mt-1">
              Max. 5 Teilnehmer für individuelle Betreuung
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agenda.map((day) => (
            <div key={day.day} className="card-floating">
              <p className="label-meta mb-2">{day.day}</p>
              <h3 className="text-base font-bold text-on-surface mb-6">
                {day.title}
              </h3>
              <div className="space-y-6">
                {day.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <p className="text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/anmeldung" className="btn-primary">
            Jetzt Platz sichern
          </Link>
        </div>
      </div>
    </section>
  )
}
