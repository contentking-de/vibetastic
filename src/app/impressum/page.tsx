import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Impressum – Vibetastic",
}

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          <p className="label-meta mb-4">Rechtliches</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight mb-12">
            Impressum
          </h1>

          <div className="space-y-10 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                Nicolas Sacotte
                <br />
                Eisenbahnstrasse 1
                <br />
                88677 Markdorf
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Kontakt
              </h2>
              <p>
                Tel.: +49 7544 5067064
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:nico@contentking.de"
                  className="text-primary hover:underline"
                >
                  nico@contentking.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
                DE227809660
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Inhaltlich verantwortlich
              </h2>
              <p>
                Inhaltlich verantwortlich i.S.v. § 18 Abs. 2 MStV:
                <br />
                Nicolas Sacotte
                <br />
                Eisenbahnstrasse 1
                <br />
                88677 Markdorf
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Streitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit und nicht verpflichtet, an einem
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>

          <div className="mt-16">
            <Link href="/" className="btn-ghost text-base">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
