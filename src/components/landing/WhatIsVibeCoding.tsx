export default function WhatIsVibeCoding() {
  const steps = [
    {
      number: "01",
      title: "Beschreibe deine Vision",
      description:
        "Du formulierst in natürlicher Sprache, was du bauen möchtest. Kein Syntax, kein Boilerplate — nur deine Idee.",
    },
    {
      number: "02",
      title: "KI generiert den Code",
      description:
        "Moderne KI-Tools verwandeln deine Beschreibung in funktionierenden Code. Du steuerst die Richtung, die KI erledigt die Arbeit.",
    },
    {
      number: "03",
      title: "Iteriere & verfeinere",
      description:
        "Durch schnelle Feedback-Schleifen entsteht ein Projekt, das nicht nur funktioniert, sondern sich auch gut anfühlt.",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="label-meta mb-4">Die Methode</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight">
            Was ist Vibe Coding?
          </h2>
          <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
            Vibe Coding ist eine neue Art zu programmieren. Du nutzt KI als
            kreativen Partner und baust Projekte in einem Bruchteil der
            üblichen Zeit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card group">
              <p className="text-5xl font-bold text-surface-container-highest/60 mb-6 group-hover:text-primary transition-colors">
                {step.number}
              </p>
              <h3 className="text-base font-bold text-on-surface mb-3">
                {step.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
