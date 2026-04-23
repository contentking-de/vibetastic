import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "AGB – Vibetastic Workshop",
}

export default function AGBPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          <p className="label-meta mb-4">Rechtliches</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight mb-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-on-surface-variant mb-12">
            Vibetastic Workshop &mdash; Stand: April 2026, Version 1.0
          </p>

          <div className="space-y-10 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 1 Vertragsschluss und Anmeldung
              </h2>
              <p className="mb-2">
                (1) Die Anmeldung zum Vibetastic Workshop (nachfolgend
                &ldquo;Veranstaltung&rdquo;) erfolgt durch Übermittlung des
                ausgefüllten Anmeldeformulars sowie Zahlung des
                Teilnahmeentgelts. Mit Eingang der Anmeldebestätigung des
                Veranstalters (per E-Mail) kommt ein verbindlicher Vertrag
                zustande.
              </p>
              <p className="mb-2">
                (2) Der Gesamtpreis umfasst die Workshopteilnahme, die im
                Voraus gebuchten Hotelzimmer sowie das Frühstück gemäß
                Leistungsbeschreibung. Eine separate Buchung einzelner
                Leistungsbestandteile ist nicht möglich, sofern nicht
                ausdrücklich anderweitig vereinbart.
              </p>
              <p>
                (3) Die Anmeldung ist auf Personen ab 18 Jahren beschränkt,
                sofern nicht ausdrücklich abweichend angegeben.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 2 Stornierung durch den Teilnehmer
              </h2>
              <p className="mb-2">
                (1) Der Teilnehmer kann jederzeit schriftlich (per E-Mail oder
                eingeschriebenem Brief) vom Vertrag zurücktreten. Maßgeblich
                für die Fristberechnung ist der Eingang der
                Stornierungserklärung beim Veranstalter.
              </p>
              <p className="mb-4">
                (2) Bei einem Rücktritt gelten die folgenden gestaffelten
                Stornogebühren, die auf den vertraglich vereinbarten
                Gesamtpreis erhoben werden:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-on-surface/10">
                      <th className="text-left py-2 pr-4 font-bold text-on-surface">
                        Stornierungszeitpunkt
                      </th>
                      <th className="text-left py-2 font-bold text-on-surface">
                        Stornogebühr
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface-variant">
                    <tr className="border-b border-on-surface/5">
                      <td className="py-2 pr-4">Mehr als 60 Tage vor Beginn</td>
                      <td className="py-2">Kostenfreie Stornierung</td>
                    </tr>
                    <tr className="border-b border-on-surface/5">
                      <td className="py-2 pr-4">30 bis 60 Tage vor Beginn</td>
                      <td className="py-2">25 % des Gesamtpreises</td>
                    </tr>
                    <tr className="border-b border-on-surface/5">
                      <td className="py-2 pr-4">14 bis 29 Tage vor Beginn</td>
                      <td className="py-2">50 % des Gesamtpreises</td>
                    </tr>
                    <tr className="border-b border-on-surface/5">
                      <td className="py-2 pr-4">7 bis 13 Tage vor Beginn</td>
                      <td className="py-2">75 % des Gesamtpreises</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Weniger als 7 Tage oder Nichterscheinen</td>
                      <td className="py-2">100 % (kein Erstattungsanspruch)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-2">
                (3) Dem Teilnehmer bleibt ausdrücklich das Recht vorbehalten,
                nachzuweisen, dass dem Veranstalter ein geringerer Schaden
                entstanden ist als die jeweilige Stornogebühr (§ 309 Nr. 5b
                BGB). In diesem Fall ist nur der tatsächlich nachgewiesene
                Schaden zu erstatten.
              </p>
              <p>
                (4) Der Veranstalter behält sich vor, nachzuweisen, dass ein
                höherer Schaden entstanden ist, sofern dies durch die
                spezifischen Vorauszahlungen an das Hotel oder andere gebundene
                Drittleistungen begründet ist.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 3 Umbuchung und Teilnehmerersatz
              </h2>
              <p className="mb-2">
                (1) Eine Umbuchung auf einen späteren Termin ist bis 14 Tage
                vor Veranstaltungsbeginn einmalig kostenfrei möglich, sofern
                ein Alternativtermin verfügbar ist. Ab diesem Zeitpunkt gelten
                die Stornogebühren gemäß § 2.
              </p>
              <p>
                (2) Der Teilnehmer ist berechtigt, eine Ersatzperson zu
                benennen, die an seiner Stelle an der Veranstaltung teilnimmt.
                Dies ist bis 5 Werktage vor Veranstaltungsbeginn schriftlich
                anzuzeigen. Eine Bearbeitungsgebühr von 25,00 EUR wird hierfür
                erhoben. Teilnehmer und Ersatzperson haften
                gesamtschuldnerisch für den Rechnungsbetrag.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 4 Hotelzimmer und Frühstück
              </h2>
              <p className="mb-2">
                (1) Die im Voraus gebuchten Hotelzimmer und
                Frühstücksleistungen sind Bestandteil des Gesamtpakets. Sie
                werden vom Veranstalter auf den Namen des Teilnehmers
                beim Hotelpartner gebucht. Die Kosten trägt der
                Veranstalter.
              </p>
              <p className="mb-2">
                (2) Sofern das Hotel gegenüber dem Veranstalter eigenständige,
                strengere Stornobedingungen geltend macht (z.&nbsp;B. bei
                Gruppenreservierungen), die über die in § 2 genannten Gebühren
                hinausgehen, werden diese Mehrkosten vollständig an den
                stornierenden Teilnehmer weitergegeben. Der Veranstalter wird
                den Teilnehmer hierüber vorab schriftlich informieren.
              </p>
              <p>
                (3) Änderungen der Zimmerbelegung (z.&nbsp;B. Einzel- statt
                Doppelzimmer) sind bis 21 Tage vor Veranstaltungsbeginn
                kostenfrei möglich. Danach können Mehrkosten anfallen, die dem
                Teilnehmer in Rechnung gestellt werden.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 5 Stornierung durch den Veranstalter
              </h2>
              <p className="mb-2">
                (1) Der Veranstalter ist berechtigt, die Veranstaltung
                abzusagen, wenn die Mindestteilnehmerzahl nicht erreicht wird
                oder wenn zwingende Gründe (z.&nbsp;B. höhere Gewalt,
                Erkrankung der Referenten, behördliche Verfügungen) vorliegen.
              </p>
              <p className="mb-2">
                (2) Im Falle der Absage durch den Veranstalter wird das
                vollständig geleistete Teilnahmeentgelt binnen 14 Tagen auf
                das vom Teilnehmer benannte Konto zurückerstattet. Weitere
                Ansprüche des Teilnehmers &ndash; insbesondere für bereits
                gebuchte Anreise oder sonstige persönliche Aufwendungen &ndash;
                sind ausgeschlossen, sofern den Veranstalter kein Verschulden
                trifft.
              </p>
              <p>
                (3) Die Absage wegen zu geringer Teilnehmerzahl wird dem
                Teilnehmer spätestens 14 Tage vor Veranstaltungsbeginn
                mitgeteilt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 6 Widerrufsrecht bei Fernabsatzverträgen
              </h2>
              <p className="mb-2">
                (1) Sofern der Vertrag im Wege des Fernabsatzes (z.&nbsp;B.
                online, per E-Mail) geschlossen wird und der Teilnehmer
                Verbraucher im Sinne des § 13 BGB ist, steht ihm grundsätzlich
                ein 14-tägiges Widerrufsrecht zu.
              </p>
              <p className="mb-2">
                (2) Gemäß § 312g Abs. 2 Nr. 9 BGB besteht das Widerrufsrecht
                nicht bei Verträgen über Freizeitdienstleistungen, wenn der
                Vertrag einen spezifischen Termin oder Zeitraum vorsieht. Da
                die Veranstaltung an einem festen Datum stattfindet, ist das
                Widerrufsrecht in der Regel ausgeschlossen.
              </p>
              <p>
                (3) Der Veranstalter weist auf diesen Ausschluss bei
                Vertragsschluss ausdrücklich hin und holt die ausdrückliche
                Zustimmung des Teilnehmers ein.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-3">
                § 7 Schriftform und Salvatorische Klausel
              </h2>
              <p className="mb-2">
                (1) Alle Stornierungen und Umbuchungen bedürfen der
                Schriftform (E-Mail genügt). Mündliche Erklärungen sind nicht
                wirksam.
              </p>
              <p className="mb-2">
                (2) Sollten einzelne Bestimmungen dieser AGB ganz oder
                teilweise unwirksam sein oder werden, berührt dies die
                Wirksamkeit der übrigen Bestimmungen nicht. Anstelle der
                unwirksamen Bestimmung gilt die gesetzliche Regelung.
              </p>
              <p>
                (3) Es gilt ausschließlich deutsches Recht. Gerichtsstand ist,
                soweit gesetzlich zulässig, der Sitz des Veranstalters.
              </p>
            </section>

            <section className="pt-4 border-t border-on-surface/10 text-sm">
              <p>
                Veranstalter: Nicolas Sacotte, Eisenbahnstrasse 1, 88677
                Markdorf
              </p>
            </section>
          </div>

          <div className="mt-16">
            <Link href="/" className="btn btn-ghost">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
