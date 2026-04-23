export default function Host() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="host">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">06 &nbsp;/&nbsp; Dein Host</div>
        </div>
        <div className="grid grid-cols-1 gap-10 md-wide:grid-cols-[360px_1fr] md-wide:gap-16">
          <div
            className="reveal aspect-[4/5] border border-line rounded-[14px] flex items-end p-6 text-ink-mute font-mono text-[11px]"
            style={{
              background: "repeating-linear-gradient(45deg, var(--bg-soft) 0 10px, var(--bg-card) 10px 20px)",
            }}
          >
            [ Foto &middot; 4:5 ]
          </div>
          <div className="reveal">
            <div className="font-display text-[52px] font-normal tracking-display leading-none mb-2">
              Mira Hartwig
            </div>
            <div className="font-mono text-xs text-ink-mute tracking-label mb-7">
              FOUNDER &middot; VIBETASTIC &nbsp;&middot;&nbsp; EX-PRODUCT @ WAYFINDER
            </div>
            <div className="space-y-[18px]">
              <p className="text-[17px] text-ink-soft max-w-[560px]" style={{ textWrap: "pretty" }}>
                Mira hat die letzten 12 Jahre mit Teams gearbeitet, die Produkte von Null auf die Strasse bringen. Als sich KI-Tools 2024 plötzlich rasant verbesserten, fiel ihr auf: plötzlich können Menschen bauen, die das vorher nie konnten.
              </p>
              <p className="text-[17px] text-ink-soft max-w-[560px]" style={{ textWrap: "pretty" }}>
                Vibetastic ist ihr Versuch, diese Menschen nicht allein zu lassen. Denn Vibecoding ist leicht zu probieren — und überraschend schwer <em className="italic">gut</em> zu machen.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["EX-PRODUCT LEAD", "200+ WORKSHOPS", "4.9 ★ DURCHSCHNITT", "MIT MENTORIN-TEAM"].map((c) => (
                <div key={c} className="font-mono text-[11px] px-3.5 py-2 bg-bg-soft rounded-full tracking-[0.04em]">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
