import { auth } from "@/lib/auth"
import Link from "next/link"
import { ReactNode } from "react"

function ChecklistSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-on-surface mb-4 uppercase tracking-wider opacity-60">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function ChecklistItem({ label, detail, href }: { label: string; detail?: string; href?: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1 w-4 h-4 rounded-sm border-outline-variant/40 text-primary focus:ring-primary-fixed-dim/30 shrink-0"
      />
      <div>
        <span className="text-on-surface font-medium">{label}</span>
        {detail && (
          <span className="block text-sm text-on-surface-variant mt-0.5">{detail}</span>
        )}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-primary hover:underline mt-1"
          >
            {href.replace(/^https?:\/\//, "")} &rarr;
          </a>
        )}
      </div>
    </label>
  )
}

const cards = [
  {
    title: "Workshop-Programm",
    description: "Agenda, Materialien und Vorbereitungsaufgaben für den Workshop.",
    href: "/club/workshop",
    label: "Zum Programm",
  },
  {
    title: "Unterkunft",
    description: "Im Preis inklusive: Hotel Bürgerstuben mit Frühstück und Mittagessen für alle Teilnehmer.",
    href: "/club/unterkunft",
    label: "Unterkunft ansehen",
  },
  {
    title: "Anreise",
    description: "Bahnhof Markdorf = Workshop-Location. Plus Infos zu Flugzeug und Auto.",
    href: "/club/anreise",
    label: "Anreise planen",
  },
]

export default async function ClubDashboard() {
  const session = await auth()

  return (
    <div>
      <div className="mb-12">
        <p className="label-meta mb-2">Willkommen im Club</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-display text-on-surface">
          Hallo, {session?.user?.name || session?.user?.email?.split("@")[0]}!
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Schön, dass du dabei bist. Hier findest du alle Infos rund um den
          Workshop.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="card-floating group hover:shadow-ambient transition-shadow">
            <h3 className="text-base font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              {card.description}
            </p>
            <span className="text-sm font-medium text-primary">
              {card.label} &rarr;
            </span>
          </Link>
        ))}
      </div>

      <div className="card">
        <h2 className="text-base font-bold text-on-surface mb-2">
          Deine Vorbereitungs-Checkliste
        </h2>
        <p className="text-sm text-on-surface-variant mb-8">
          Bitte erledige alle Punkte <strong>vor</strong> dem Workshop, damit wir direkt loslegen können.
        </p>

        <div className="space-y-10">
          <ChecklistSection title="Software installieren">
            <ChecklistItem
              label="Node.js (LTS, v22+)"
              detail="JavaScript-Runtime. Am besten via nvm installieren."
              href="https://nodejs.org"
            />
            <ChecklistItem
              label="Git"
              detail="Versionskontrolle. Prüfen mit: git --version"
              href="https://git-scm.com"
            />
            <ChecklistItem
              label="Cursor Editor"
              detail="KI-gestützter Code-Editor – die Basis unseres Workshops."
              href="https://cursor.com"
            />
            <ChecklistItem
              label="Moderner Browser mit DevTools"
              detail="Chrome, Firefox oder Edge – aktuellste Version."
            />
          </ChecklistSection>

          <ChecklistSection title="Accounts anlegen">
            <ChecklistItem
              label="GitHub-Account"
              detail="Code-Hosting und Versionskontrolle. Free Tier reicht."
              href="https://github.com"
            />
            <ChecklistItem
              label="Neon-Account"
              detail="Serverless PostgreSQL-Datenbank. Free Tier reicht."
              href="https://neon.tech"
            />
            <ChecklistItem
              label="Vercel-Account"
              detail="Hosting & Deployment. Am besten direkt mit GitHub verknüpfen."
              href="https://vercel.com"
            />
            <ChecklistItem
              label="Resend-Account"
              detail="E-Mail-Versand (100 Mails/Tag gratis)."
              href="https://resend.com"
            />
            <ChecklistItem
              label="Stripe-Account (optional)"
              detail="Nur nötig, wenn du Zahlungen abwickeln und Rechnungen generieren willst. Test-Modus ist kostenlos."
              href="https://stripe.com"
            />
            <ChecklistItem
              label="Anthropic-Account"
              detail="Claude AI API. API-Credits nötig (mind. $5 empfohlen)."
              href="https://console.anthropic.com"
            />
          </ChecklistSection>

          <ChecklistSection title="Cursor einrichten">
            <ChecklistItem
              label="Mit GitHub in Cursor anmelden"
              detail="Cursor > Settings > Sign in with GitHub."
            />
            <ChecklistItem
              label="Cursor Pro aktivieren oder Free Trial starten"
              detail="Für die vollen KI-Features im Workshop."
              href="https://cursor.com/pricing"
            />
          </ChecklistSection>

          <ChecklistSection title="Am Workshop-Tag">
            <ChecklistItem
              label="Laptop mit Netzteil einpacken"
            />
            <ChecklistItem
              label="Alle API-Keys griffbereit haben"
              detail="Neon Connection String, Resend API Key, Stripe Keys, Anthropic API Key."
            />
          </ChecklistSection>
        </div>
      </div>
    </div>
  )
}
