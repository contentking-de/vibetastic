"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-40 border-b border-line"
      style={{
        background: "color-mix(in oklab, var(--bg) 85%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="wrap flex items-center justify-between py-[18px]">
        <Link href="/#top" className="flex items-center gap-3 font-mono text-[15px] font-medium tracking-tight">
          <Image src="/vibetastic-logo.svg" alt="" width={40} height={40} className="shrink-0" />
          <span className="font-display text-[40px] font-normal tracking-display leading-none">vibetastic.</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-base text-ink-soft font-bold">
          <Link href="/#what" className="transition-colors hover:text-ink">Was ist das?</Link>
          <Link href="/#agenda" className="transition-colors hover:text-ink">Agenda</Link>
          <Link href="/#schedule" className="transition-colors hover:text-ink">Termine</Link>
          <Link href="/#price" className="transition-colors hover:text-ink">Preis</Link>
          <Link href="/#faq" className="transition-colors hover:text-ink">FAQ</Link>
        </div>

        <div className="hidden md:flex items-center gap-3 font-bold">
          <Link href="/club" className="btn btn-ghost">
            Vibetastic Club
          </Link>
          <Link href="/#signup" className="btn">
            Warteliste →
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-ink"
          aria-label="Menü"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-[var(--gutter)] pb-6 space-y-4 text-sm text-ink-soft font-bold">
          <Link href="/#what" className="block" onClick={() => setMenuOpen(false)}>Was ist das?</Link>
          <Link href="/#agenda" className="block" onClick={() => setMenuOpen(false)}>Agenda</Link>
          <Link href="/#schedule" className="block" onClick={() => setMenuOpen(false)}>Termine</Link>
          <Link href="/#price" className="block" onClick={() => setMenuOpen(false)}>Preis</Link>
          <Link href="/#faq" className="block" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link href="/club" className="block" onClick={() => setMenuOpen(false)}>Club</Link>
          <Link href="/#signup" className="btn inline-flex" onClick={() => setMenuOpen(false)}>Warteliste →</Link>
        </div>
      )}
    </nav>
  )
}
