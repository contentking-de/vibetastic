"use client"

import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  function resetCookieConsent() {
    localStorage.removeItem("vibetastic-cookie-consent")
    window.location.reload()
  }

  return (
    <footer className="border-t border-line pt-14 pb-10 text-sm text-ink-mute">
      <div className="wrap flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-between sm:items-end">
        <div>
          <div className="font-display text-[40px] tracking-display text-ink leading-none flex items-center gap-3">
            <Image src="/vibetastic-logo.svg" alt="" width={40} height={40} />
            vibetastic.
          </div>
          <div className="mt-2">Workshops für Menschen, die bauen wollen.</div>
        </div>
        <nav className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2 font-mono text-xs tracking-[0.04em]">
          <Link href="/impressum">IMPRESSUM</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/datenschutz">DATENSCHUTZ</Link>
          <button onClick={resetCookieConsent} className="hover:text-ink transition-colors text-left">COOKIE-EINSTELLUNGEN</button>
          <Link href="/kontakt">KONTAKT</Link>
        </nav>
      </div>
      <div
        className="wrap mt-8 pt-6 border-t border-line font-mono text-[11px] tracking-[0.04em]"
      >
        © 2026 VIBETASTIC &middot; MADE WITH LOVE &amp; LLMs
      </div>
    </footer>
  )
}
