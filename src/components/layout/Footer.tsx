import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-10 text-sm text-ink-mute">
      <div className="wrap flex flex-wrap justify-between gap-6 items-end">
        <div>
          <div className="font-display text-[40px] tracking-display text-ink leading-none flex items-center gap-3">
            <Image src="/vibetastic-logo.svg" alt="" width={40} height={40} />
            vibetastic.
          </div>
          <div className="mt-2">Workshops für Menschen, die bauen wollen.</div>
        </div>
        <div className="flex gap-5 font-mono text-xs tracking-[0.04em]">
          <Link href="/impressum">IMPRESSUM</Link>
          <Link href="#">AGB</Link>
          <Link href="/datenschutz">DATENSCHUTZ</Link>
          <Link href="#">KONTAKT</Link>
        </div>
      </div>
      <div
        className="wrap mt-8 pt-6 border-t border-line font-mono text-[11px] tracking-[0.04em]"
      >
        © 2026 VIBETASTIC &middot; MADE WITH LOVE &amp; LLMs
      </div>
    </footer>
  )
}
