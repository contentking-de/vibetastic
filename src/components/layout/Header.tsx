"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 text-2xl font-extrabold tracking-display text-on-surface">
          <Image src="/vibetastic-logo.svg" alt="vibetastic Logo" width={28} height={28} />
          vibetastic
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#workshop" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
            Workshop
          </Link>
          <Link href="#pricing" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
            Preise
          </Link>
          <Link href="#faq" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
            FAQ
          </Link>
          <Link href="/login" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
            Club Login
          </Link>
          <Link href="/anmeldung" className="btn-primary text-sm !px-6 !py-2.5">
            Jetzt anmelden
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-on-surface"
          aria-label="Menü öffnen"
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
        <div className="md:hidden glass bg-surface-container-low/80 px-6 py-6 space-y-4">
          <Link href="#workshop" className="block text-on-surface-variant" onClick={() => setMenuOpen(false)}>
            Workshop
          </Link>
          <Link href="#pricing" className="block text-on-surface-variant" onClick={() => setMenuOpen(false)}>
            Preise
          </Link>
          <Link href="#faq" className="block text-on-surface-variant" onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
          <Link href="/login" className="block text-on-surface-variant" onClick={() => setMenuOpen(false)}>
            Club Login
          </Link>
          <Link href="/anmeldung" className="btn-primary text-sm w-full text-center" onClick={() => setMenuOpen(false)}>
            Jetzt anmelden
          </Link>
        </div>
      )}
    </header>
  )
}
