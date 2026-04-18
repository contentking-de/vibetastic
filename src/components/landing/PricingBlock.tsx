import Link from "next/link"

export default function PricingBlock() {
  const included = [
    "2 Tage Intensiv-Workshop vor Ort",
    "Persönliche Betreuung (max. 15 Teilnehmer)",
    "Alle Workshop-Materialien & Templates",
    "Zugang zum exklusiven Vibetastic Club",
    "Lebenslanger Zugang zu Updates & Community",
    "Getränke & Snacks während des Workshops",
  ]

  return (
    <section id="pricing" className="py-24 md:py-32 bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="label-meta mb-4">Investition</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight">
            Dein Ticket
          </h2>
        </div>

        <div className="max-w-lg mx-auto card-floating text-center">
          <p className="label-meta mb-6">Vibetastic Workshop</p>

          <div className="mb-8">
            <span className="text-6xl md:text-7xl font-bold tracking-display text-on-surface">
              297
            </span>
            <span className="text-2xl text-on-surface-variant ml-1">&euro;</span>
          </div>

          <div className="space-y-6 text-left mb-10">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-on-surface-variant">{item}</span>
              </div>
            ))}
          </div>

          <Link href="/anmeldung" className="btn-primary w-full text-center">
            Jetzt buchen
          </Link>

          <p className="mt-4 text-xs text-on-surface-variant/60">
            Einmalige Zahlung. Inkl. MwSt. Sichere Zahlung über Stripe.
          </p>
        </div>
      </div>
    </section>
  )
}
