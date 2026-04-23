"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Muss ich schon programmieren können?",
    a: "Nein — der Workshop ist explizit für Non-Techies konzipiert. Wenn du einen Computer bedienen und klare Sätze schreiben kannst, reicht das aus. Wir starten bei Null.",
  },
  {
    q: "Was genau ist im Preis enthalten?",
    a: "Die 1.790 € beinhalten alle Workshop-Sessions, 1 Übernachtung im Einzelzimmer, sämtliche Mahlzeiten & Getränke, Kaffee/Snacks, und die Tool-Zugänge während des Wochenendes. Keine Anreise, kein Trinkgeld-Zwang.",
  },
  {
    q: "Welchen Laptop brauche ich?",
    a: "Jeder Laptop der letzten 5 Jahre reicht (Mac, Windows, auch Chromebook bedingt). Eine stabile Internetverbindung und 10 GB freier Speicher sind sinnvoll. Wir schicken dir vorab eine kleine Checkliste.",
  },
  {
    q: "Wie komme ich dahin?",
    a: "Die Contentking Agentur liegt in Markdorf am Bodensee. Anreise mit dem Zug bis Markdorf oder Friedrichshafen, von dort sind es nur wenige Minuten. PKW-Stellplätze sind vorhanden.",
  },
  {
    q: "Was, wenn ich kurzfristig absagen muss?",
    a: "Bis 21 Tage vorher gibt es 80 % zurück, bis 7 Tage vorher 50 %. Danach versuchen wir deinen Platz weiterzugeben — klappt das, gibt's den vollen Betrag zurück. Wir sind da unkompliziert.",
  },
  {
    q: "Was nehme ich am Ende mit?",
    a: "Eine eigene, veröffentlichte Website unter deiner Domain. Eine Routine, wie du eigenständig weiterbaust. Ein kleines Alumni-Netzwerk. Und vermutlich zu viele Ideen für das nächste Ding.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="faq">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">10 &nbsp;/&nbsp; FAQ</div>
          <h2 className="sec-title">
            Die Fragen, die wir am <em>häufigsten</em> hören.
          </h2>
        </div>
        <div className="reveal border-t border-line">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-line">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex justify-between items-center w-full py-6 text-left font-display text-[22px] tracking-tight"
              >
                {faq.q}
                <span
                  className="font-mono text-lg transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-[350ms] ease-in-out"
                style={{ maxHeight: openIndex === i ? "400px" : "0" }}
              >
                <div className="pb-7 text-ink-soft text-base max-w-[680px]" style={{ textWrap: "pretty" }}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
