import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low hidden lg:block" />

      <div className="relative mx-auto max-w-6xl px-6 py-32 lg:py-0">
        <div className="max-w-2xl">
          <p className="label-meta mb-6">Exklusiver Workshop</p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-display leading-[1.05] text-on-surface mb-8">
            VibeCoding
            <br />
            <span className="text-primary">für Einsteiger.</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-lg mb-12">
            Lerne Vibe Coding in einem exklusiven Workshop. Erschaffe
            funktionierende Projekte mit KI-Unterstützung &mdash; ohne
            jahrelange Coding-Erfahrung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/anmeldung" className="btn-primary text-base">
              Jetzt Platz sichern
            </Link>
            <Link href="#workshop" className="btn-ghost text-base">
              Mehr erfahren &darr;
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-10">
            <div>
              <p className="text-2xl font-bold text-on-surface">2 Tage</p>
              <p className="text-sm text-on-surface-variant">Intensiv-Workshop</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-high" />
            <div>
              <p className="text-2xl font-bold text-on-surface">5 Plätze</p>
              <p className="text-sm text-on-surface-variant">Limitierte Teilnehmer</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-high hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-2xl font-bold text-on-surface">100%</p>
              <p className="text-sm text-on-surface-variant">Hands-on Praxis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
