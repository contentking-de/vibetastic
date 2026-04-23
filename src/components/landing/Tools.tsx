const tools = [
  { name: "Claude", desc: "KI-ASSISTENT" },
  { name: "Cursor", desc: "CODE-EDITOR" },
  { name: "Vercel", desc: "HOSTING" },
  { name: "Supabase", desc: "DATENBANK" },
  { name: "Figma", desc: "DESIGN-SKIZZE" },
  { name: "GitHub", desc: "VERSIONIERUNG" },
  { name: "Stripe", desc: "ZAHLUNGEN (OPTIONAL)" },
  { name: "Resend", desc: "E-MAILS" },
]

export default function Tools() {
  return (
    <section className="py-[clamp(80px,12vh,140px)] border-t border-line" id="tools">
      <div className="wrap">
        <div className="reveal">
          <div className="sec-label">05 &nbsp;/&nbsp; Tool-Stack</div>
          <h2 className="sec-title">
            Die Werkzeuge, mit denen du am Montag weitermachst.
          </h2>
          <p className="sec-lede">
            Wir zeigen dir etablierte, stabile Tools — keine Tech-Experimente. Alles sofort zu Hause weiter nutzbar.
          </p>
        </div>
        <div className="reveal grid gap-[1px] bg-line border border-line rounded-[14px] overflow-hidden" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-bg-card p-7 flex flex-col gap-2 min-h-[130px] transition-colors hover:bg-bg-soft"
            >
              <div className="font-display text-[22px] tracking-tight">{tool.name}</div>
              <div className="font-mono text-[11px] text-ink-mute tracking-[0.04em] uppercase mt-auto">
                {tool.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
