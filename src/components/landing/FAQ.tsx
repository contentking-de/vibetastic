"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Brauche ich Programmiererfahrung?",
    answer:
      "Nein! Der Workshop ist speziell für Einsteiger konzipiert. Du brauchst nur einen Laptop und Neugier. Vibe Coding nutzt KI als kreativen Partner — du beschreibst, was du bauen willst, und die KI hilft dir dabei.",
  },
  {
    question: "Was genau ist Vibe Coding?",
    answer:
      "Vibe Coding ist ein Ansatz, bei dem du mit KI-Tools wie Cursor, Claude oder ChatGPT programmierst. Du beschreibst deine Ideen in natürlicher Sprache und iterierst schnell, bis das Ergebnis passt. Es geht um den Flow — die Vibe.",
  },
  {
    question: "Welche Software/Tools brauche ich?",
    answer:
      "Du brauchst einen Laptop mit Internetzugang. Die genaue Tool-Liste und Setup-Anleitung erhältst du nach der Anmeldung im Club-Bereich. Wir nutzen hauptsächlich Cursor als Code-Editor und verschiedene KI-APIs.",
  },
  {
    question: "Gibt es eine Geld-zurück-Garantie?",
    answer:
      "Ja. Wenn du nach dem ersten Workshop-Tag nicht zufrieden bist, erstatten wir dir den vollen Betrag. Kein Risiko für dich.",
  },
  {
    question: "Wie groß ist die Gruppe?",
    answer:
      "Maximal 15 Teilnehmer. So können wir sicherstellen, dass jeder individuelle Unterstützung bekommt und seine eigenen Projekte umsetzen kann.",
  },
  {
    question: "Was ist der Vibetastic Club?",
    answer:
      "Nach der Buchung erhältst du Zugang zum exklusiven Club-Bereich. Dort findest du Workshop-Agenda, Anreise-Infos, Unterkunftsempfehlungen und nach dem Workshop alle Materialien und Community-Ressourcen.",
  },
  {
    question: "Kann ich die Rechnung von der Steuer absetzen?",
    answer:
      "Ja, du erhältst eine ordnungsgemäße Rechnung mit ausgewiesener MwSt., die du als Weiterbildung steuerlich geltend machen kannst.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16">
          <p className="label-meta mb-4">Häufige Fragen</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface leading-tight">
            Noch Fragen?
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="card-floating">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-on-surface">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              {openIndex === i && (
                <p className="mt-4 text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
