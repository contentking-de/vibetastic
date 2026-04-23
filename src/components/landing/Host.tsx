const hosts = [
  {
    name: "Nicolas Sacotte",
    role: "FOUNDER · VIBETASTIC · CONTENTKING",
    bio: "Nicolas verbindet Unternehmertum mit Technologie. Als Gründer von Contentking und Vibetastic hilft er Menschen, mit modernen KI-Tools eigene digitale Produkte auf die Straße zu bringen.",
    img: "/nico-sacotte.png",
  },
  {
    name: "Maya Sacotte",
    role: "CO-FOUNDER · VIBETASTIC",
    bio: "Maya bringt Struktur und Kreativität zusammen. Sie sorgt dafür, dass aus wilden Ideen klare Konzepte werden — und dass jede:r Teilnehmer:in den Workshop mit einem echten Ergebnis verlässt.",
    img: "/maya-sacotte.jpg",
  },
  {
    name: "Thorsten Loth",
    role: "COACH · VIBETASTIC",
    bio: "Thorsten ist der geduldige Erklärer im Team. Mit einem Auge fürs Detail und einem Talent fürs Vereinfachen begleitet er dich durch jede technische Hürde.",
    img: "/thorsten-loth.webp",
  },
]

export default function Host() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="host">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">06 &nbsp;/&nbsp; Deine Hosts</div>
          <h2 className="sec-title">
            Die Menschen, die dich <em>begleiten.</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md-wide:grid-cols-3">
          {hosts.map((host) => (
            <div key={host.name} className="reveal">
              <div
                className="aspect-[4/5] border border-line rounded-[14px] overflow-hidden mb-6"
              >
                <img
                  src={host.img}
                  alt={host.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-display text-[32px] font-normal tracking-display leading-none mb-2">
                {host.name}
              </div>
              <div className="font-mono text-xs text-ink-mute tracking-label mb-4">
                {host.role}
              </div>
              <p className="text-[15px] text-ink-soft leading-relaxed" style={{ textWrap: "pretty" }}>
                {host.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
