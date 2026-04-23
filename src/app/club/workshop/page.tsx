export default function WorkshopPage() {
  const agenda = [
    {
      day: "Tag 1 – Grundlagen & Erste Projekte",
      sessions: [
        { time: "09:00 – 09:30", title: "Begrüßung & Kennenlernen", description: "Vorstellungsrunde, Erwartungen klären, Tagesüberblick." },
        { time: "09:30 – 11:00", title: "Einführung in Vibe Coding", description: "Was ist Vibe Coding? Philosophie, Mindset und die wichtigsten Prinzipien." },
        { time: "11:00 – 11:15", title: "Kaffeepause", description: "" },
        { time: "11:15 – 12:30", title: "Setup deiner KI-Toolchain", description: "Cursor installieren und konfigurieren. Erste Prompts schreiben." },
        { time: "12:30 – 13:30", title: "Mittagspause", description: "" },
        { time: "13:30 – 15:00", title: "Dein erstes Projekt", description: "Von der Idee zum funktionierenden Prototyp in 90 Minuten." },
        { time: "15:00 – 15:15", title: "Kaffeepause", description: "" },
        { time: "15:15 – 16:30", title: "Hands-on: Landing Pages & Websites", description: "Verschiedene Projekt-Templates ausprobieren und anpassen." },
        { time: "16:30 – 17:00", title: "Wrap-up & Ausblick Tag 2", description: "Reflexion, offene Fragen, Vorschau auf morgen." },
      ],
    },
    {
      day: "Tag 2 – Fortgeschritten & Eigenes Projekt",
      sessions: [
        { time: "09:00 – 09:15", title: "Check-in", description: "Kurze Reflexion über Tag 1." },
        { time: "09:15 – 10:45", title: "Fortgeschrittene Prompting-Techniken", description: "Kontextmanagement, Multi-File-Edits, Debugging mit KI." },
        { time: "10:45 – 11:00", title: "Kaffeepause", description: "" },
        { time: "11:00 – 12:30", title: "Datenbanken & APIs integrieren", description: "Supabase/Neon, Stripe und andere Services einbinden." },
        { time: "12:30 – 13:30", title: "Mittagspause", description: "" },
        { time: "13:30 – 15:30", title: "Eigenes Projekt bauen", description: "Du baust dein eigenes Projekt mit individueller Unterstützung." },
        { time: "15:30 – 16:30", title: "Projekt-Präsentationen", description: "Jeder stellt sein Projekt vor. Feedback & Austausch." },
        { time: "16:30 – 17:00", title: "Abschluss & nächste Schritte", description: "Community, Ressourcen und wie es weitergeht." },
      ],
    },
  ]

  return (
    <div>
      <div className="mb-12">
        <p className="label-meta mb-2">Workshop-Programm</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Agenda & Materialien
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Hier findest du den vollständigen Ablaufplan und alle
          Vorbereitungsmaterialien.
        </p>
      </div>

      <div className="card mb-8">
          <h2 className="text-base font-bold text-on-surface mb-4">
          Vor dem Workshop
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
            <div>
              <p className="font-medium text-on-surface">Cursor installieren</p>
              <p className="text-sm text-on-surface-variant">
                Lade Cursor unter{" "}
                <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                  cursor.com
                </a>{" "}
                herunter und installiere den Editor.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
            <div>
              <p className="font-medium text-on-surface">API Key einrichten</p>
              <p className="text-sm text-on-surface-variant">
                Erstelle einen API Key bei OpenAI oder Anthropic. Eine
                Anleitung folgt per E-Mail.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
            <div>
              <p className="font-medium text-on-surface">Laptop aufladen</p>
              <p className="text-sm text-on-surface-variant">
                Bring deinen Laptop vollständig geladen mit. Steckdosen sind
                vorhanden, aber ein langes Kabel schadet nicht.
              </p>
            </div>
          </div>
        </div>
      </div>

      {agenda.map((day) => (
        <div key={day.day} className="mb-8">
          <h2 className="text-base font-bold text-on-surface mb-6">
            {day.day}
          </h2>
          <div className="space-y-6">
            {day.sessions.map((s) => (
              <div key={s.time} className="card-floating">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <p className="text-sm font-mono text-primary shrink-0 w-28">
                    {s.time}
                  </p>
                  <div>
                    <p className="font-medium text-on-surface">{s.title}</p>
                    {s.description && (
                      <p className="text-sm text-on-surface-variant mt-1">
                        {s.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
