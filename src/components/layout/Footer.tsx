import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="flex items-center gap-1.5 text-2xl font-extrabold tracking-display text-on-surface mb-4">
              <Image src="/vibetastic-logo.svg" alt="vibetastic Logo" width={28} height={28} />
              vibetastic
            </p>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Vibe Coding lernen in einem Workshop, der sich anfühlt wie ein
              kreatives Retreat. Programmiere mit KI und erschaffe Projekte,
              die begeistern.
            </p>
          </div>

          <div>
            <p className="label-meta mb-4">Links</p>
            <div className="space-y-3">
              <Link href="#workshop" className="block text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Workshop
              </Link>
              <Link href="#pricing" className="block text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Preise
              </Link>
              <Link href="#faq" className="block text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                FAQ
              </Link>
              <Link href="/login" className="block text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Club Login
              </Link>
            </div>
          </div>

          <div>
            <p className="label-meta mb-4">Rechtliches</p>
            <div className="space-y-3">
              <Link href="/impressum" className="block text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="block text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Datenschutzerklärung
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 bg-surface-container-high/40 -mx-6 px-6 rounded-lg">
          <p className="text-xs text-on-surface-variant/60 text-center pb-8">
            &copy; {new Date().getFullYear()} vibetastic. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
