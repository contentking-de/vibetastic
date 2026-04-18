import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Vibetastic",
}

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          <p className="label-meta mb-4">Rechtliches</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight mb-12">
            Datenschutzerklärung
          </h1>

          <div className="space-y-10 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                1. Verantwortlicher
              </h2>
              <p>
                Nicolas Sacotte
                <br />
                Eisenbahnstrasse 1
                <br />
                88677 Markdorf
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
                2. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen
                durch den Browser übermittelt und in Server-Logfiles
                gespeichert. Dies umfasst:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>
                  Website, von der aus der Zugriff erfolgt (Referrer-URL)
                </li>
                <li>
                  Verwendeter Browser und ggf. das Betriebssystem Ihres
                  Rechners sowie der Name Ihres Access-Providers
                </li>
              </ul>
              <p className="mt-3">
                Diese Daten werden ausschließlich zur Sicherstellung eines
                störungsfreien Betriebs der Seite und zur Verbesserung unseres
                Angebots ausgewertet. Eine Zuordnung zu einer bestimmten Person
                ist nicht möglich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                3. Registrierung und Nutzerkonto
              </h2>
              <p>
                Bei der Registrierung auf unserer Plattform erheben wir folgende
                Daten:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
              </ul>
              <p className="mt-3">
                Diese Daten werden zur Bereitstellung unseres Dienstes
                verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                4. Zahlungsabwicklung über Stripe
              </h2>
              <p>
                Für die Zahlungsabwicklung nutzen wir den Dienst Stripe
                (Stripe, Inc.). Bei einer Buchung werden Ihre Zahlungsdaten
                direkt an Stripe übermittelt und dort verarbeitet. Wir selbst
                speichern keine vollständigen Zahlungsdaten. Es gelten die
                Datenschutzbestimmungen von Stripe:{" "}
                <a
                  href="https://stripe.com/de/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  stripe.com/de/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                5. Cookies
              </h2>
              <p>
                Wir verwenden technisch notwendige Cookies, die für den Betrieb
                der Website erforderlich sind (z.B. Session-Cookies für die
                Authentifizierung). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                6. Hosting
              </h2>
              <p>
                Unsere Website wird bei einem externen Dienstleister gehostet
                (Hosting-Provider). Die personenbezogenen Daten, die auf dieser
                Website erfasst werden, werden auf den Servern des Hosters
                gespeichert. Mit dem Anbieter wurde ein
                Auftragsverarbeitungsvertrag (AVV) geschlossen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                7. Ihre Rechte
              </h2>
              <p>Sie haben das Recht:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten
                  personenbezogenen Daten zu verlangen
                </li>
                <li>
                  gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger
                  Daten zu verlangen
                </li>
                <li>
                  gemäß Art. 17 DSGVO die Löschung Ihrer gespeicherten Daten zu
                  verlangen
                </li>
                <li>
                  gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung zu
                  verlangen
                </li>
                <li>
                  gemäß Art. 20 DSGVO Ihre Daten in einem übertragbaren Format
                  zu erhalten (Datenportabilität)
                </li>
                <li>
                  gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung
                  einzulegen
                </li>
                <li>
                  gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu
                  beschweren
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                8. Änderung dieser Datenschutzerklärung
              </h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                damit sie stets den aktuellen rechtlichen Anforderungen
                entspricht oder um Änderungen unserer Leistungen umzusetzen. Für
                Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
              <p className="mt-3 text-sm text-on-surface-variant/60">
                Stand: April 2026
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
