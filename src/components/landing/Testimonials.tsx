const testimonials = [
  {
    quote: "War mega! 🤩 Noch nie einen Workshop gehabt, der so faszinierend war. Wie gesagt war der ganze Workshop ein Aha-Effekt. 😀 Und nicht nur das Inhaltliche hat gepasst. Mit den Dozenten, Teilnehmern und dem Rahmenprogramm war das Ganze echt ein top Erlebnis! Hätte auch schon wieder Lust auf eine V2.",
    name: "Mario Schwertfeger",
    initials: "MS",
    role: "hausverwalter-vz.de",
    url: "https://hausverwalter-vz.de",
  },
  {
    quote: "Ich durfte am initialen vibetastic Workshop von Nicolas Sacotte und Thorsten Loth als einer der ersten fünf überhaupt teilnehmen. Allein der Betreuungsschlüssel – fünf Teilnehmer bei drei Dozenten – war ein echtes Privileg. Nico und sein Team haben uns nicht nur dazu befähigt, das Ganze technisch anzuwenden, sondern in One-on-One-Gesprächen auch immer wieder herausgekitzelt, was als Nächstes machbar ist.",
    name: "Borris Häring",
    initials: "BH",
    role: "ihr-gutachten.com",
    url: "https://ihr-gutachten.com",
  },
  {
    quote: "Aber mal ehrlich das war wohl in den 15 Jahren OM mein bester Workshop. Hier lief einfach alles. Top Team, Top Location, die Tage gut strukturiert. Mega Input. Ich komme sofort wieder und mache nochmal mit weil ich würde bei jedem Mal wieder was dazu lernen.. die Kosten sind ein Witz zum Ergebnis",
    name: "Michael Schöttler",
    initials: "MS",
    role: "papa.de",
    url: "https://papa.de",
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
                  <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-mute hover:text-accent transition-colors">{t.role}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
