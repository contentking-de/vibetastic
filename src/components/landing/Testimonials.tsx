export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Ich habe in zwei Tagen eine komplette SaaS-App gebaut. Vor dem Workshop hätte ich das nicht für möglich gehalten.",
      name: "Sarah M.",
      role: "Gründerin & Designerin",
    },
    {
      quote:
        "Vibe Coding hat mir gezeigt, dass Programmieren nicht kompliziert sein muss. Die Atmosphäre im Workshop war unglaublich.",
      name: "Thomas K.",
      role: "Marketing Manager",
    },
    {
      quote:
        "Endlich kann ich meine eigenen Ideen umsetzen, ohne auf Entwickler warten zu müssen. Gamechanger!",
      name: "Lisa R.",
      role: "Produktmanagerin",
    },
    {
      quote:
        "Die persönliche Betreuung und die Community machen den Unterschied. Absolute Empfehlung.",
      name: "Markus W.",
      role: "Freelancer",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="label-meta mb-4">Stimmen</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight">
            Was Teilnehmer sagen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-floating">
              <p className="text-lg text-on-surface leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-on-surface">{t.name}</p>
                <p className="text-sm text-on-surface-variant">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
