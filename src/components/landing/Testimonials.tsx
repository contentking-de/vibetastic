const testimonials = [
  {
    quote: "Ich bin Therapeutin. Ich hätte nie gedacht, dass ich am Ende des Workshops eine eigene Buchungsseite live habe. Es hat sich nicht nach Coden angefühlt — mehr nach einem sehr geduldigen Gespräch.",
    name: "Lena Kirsch",
    initials: "LK",
    role: "Heilpraktikerin, Leipzig",
  },
  {
    quote: "Endlich jemand, der diese Tools so erklärt, dass ich mich nicht dumm fühle. Ich hab 2 Wochen später meine erste Kundin gefunden — mit einem Tool, das ich am Workshop gebaut habe.",
    name: "Jonas Bergmann",
    initials: "JB",
    role: "Freelance-Coach, Berlin",
  },
  {
    quote: "Der Workshop war ein Geschenk. Kein Tech-Bro-Vibe, viele Pausen, richtig gutes Essen — und am Ende läuft da tatsächlich meine Website. Noch immer.",
    name: "Sofia Reinhardt",
    initials: "SR",
    role: "Galerieassistentin, München",
  },
]

export default function Testimonials() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="testi">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">08 &nbsp;/&nbsp; Stimmen</div>
          <h2 className="sec-title">Was andere so darüber sagen.</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="reveal bg-bg-card border border-line rounded-[14px] p-7 flex flex-col gap-5"
            >
              <div className="font-display text-[22px] leading-[1.3] tracking-tight flex-1" style={{ textWrap: "pretty" }}>
                &ldquo;{t.quote}&rdquo;
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-ink flex items-center justify-center font-semibold text-[13px]">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-ink-mute">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
