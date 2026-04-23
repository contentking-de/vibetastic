"use client"

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
        <Link href="#top" className="flex items-baseline gap-[2px] font-mono text-[15px] font-medium tracking-tight">
          <span className="font-display text-2xl font-normal tracking-display">vibetastic</span>
          <span
            className="inline-block w-2 h-4 ml-1"
            style={{
              background: "var(--accent)",
              transform: "translateY(2px)",
              animation: "blink 1.1s steps(2) infinite",
            }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-ink-soft">
          <Link href="#what" className="transition-colors hover:text-ink">Was ist das?</Link>
          <Link href="#agenda" className="transition-colors hover:text-ink">Agenda</Link>
          <Link href="#schedule" className="transition-colors hover:text-ink">Termine</Link>
          <Link href="#price" className="transition-colors hover:text-ink">Preise</Link>
          <Link href="#faq" className="transition-colors hover:text-ink">FAQ</Link>
        </div>

        <Link href="#signup" className="hidden md:inline-flex btn">
          Anmelden →
        </Link>

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
        <div className="md:hidden px-[var(--gutter)] pb-6 space-y-4 text-sm text-ink-soft">
          <Link href="#what" className="block" onClick={() => setMenuOpen(false)}>Was ist das?</Link>
          <Link href="#agenda" className="block" onClick={() => setMenuOpen(false)}>Agenda</Link>
          <Link href="#schedule" className="block" onClick={() => setMenuOpen(false)}>Termine</Link>
          <Link href="#price" className="block" onClick={() => setMenuOpen(false)}>Preise</Link>
          <Link href="#faq" className="block" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link href="#signup" className="btn inline-flex" onClick={() => setMenuOpen(false)}>Anmelden →</Link>
        </div>
      )}
    </nav>
  )
}
