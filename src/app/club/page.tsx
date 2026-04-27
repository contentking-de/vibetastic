import { auth } from "@/lib/auth"
import Link from "next/link"
import {
  ChecklistSection,
  ChecklistItem,
  ChecklistProvider,
} from "./Checklist"
import { getCheckedItems } from "./checklist-actions"

const cards = [
  {
    title: "Workshop-Programm",
    description:
      "Agenda, Materialien und Vorbereitungsaufgaben für den Workshop.",
    href: "/club/workshop",
    label: "Zum Programm",
  },
  {
    title: "Unterkunft",
    description:
      "Im Preis inklusive: Hotel Bürgerstuben mit Frühstück und Mittagessen für alle Teilnehmer.",
    href: "/club/unterkunft",
    label: "Unterkunft ansehen",
  },
  {
    title: "Anreise",
    description:
      "Bahnhof Markdorf = Workshop-Location. Plus Infos zu Flugzeug und Auto.",
    href: "/club/anreise",
    label: "Anreise planen",
  },
]

export default async function ClubDashboard() {
  const session = await auth()
  const checkedItems = await getCheckedItems()

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
          <Link
            key={card.href}
            href={card.href}
            className="card-floating group hover:shadow-ambient transition-shadow"
          >
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
          Bitte erledige alle Punkte <strong>vor</strong> dem Workshop, damit wir
          direkt loslegen können.
        </p>

        <ChecklistProvider initialCheckedIds={checkedItems}>
          {({ checkedIds, toggle }) => (
            <div className="space-y-10">
              <ChecklistSection title="Software installieren" checkedIds={checkedIds}>
                <ChecklistItem
                  id="sw-nodejs"
                  label="Node.js (LTS, v22+)"
                  detail="JavaScript-Runtime. Am besten via nvm installieren."
                  href="https://nodejs.org"
                  checked={checkedIds.has("sw-nodejs")}
                  onToggle={() => toggle("sw-nodejs")}
                />
                <ChecklistItem
                  id="sw-git"
                  label="Git"
                  detail="Versionskontrolle. Prüfen mit: git --version"
                  href="https://git-scm.com"
                  checked={checkedIds.has("sw-git")}
                  onToggle={() => toggle("sw-git")}
                />
                <ChecklistItem
                  id="sw-cursor"
                  label="Cursor Editor"
                  detail="KI-gestützter Code-Editor – die Basis unseres Workshops."
                  href="https://cursor.com"
                  checked={checkedIds.has("sw-cursor")}
                  onToggle={() => toggle("sw-cursor")}
                />
                <ChecklistItem
                  id="sw-browser"
                  label="Moderner Browser mit DevTools"
                  detail="Chrome, Firefox oder Edge – aktuellste Version."
                  checked={checkedIds.has("sw-browser")}
                  onToggle={() => toggle("sw-browser")}
                />
              </ChecklistSection>

              <ChecklistSection title="Accounts anlegen" checkedIds={checkedIds}>
                <ChecklistItem
                  id="acc-github"
                  label="GitHub-Account (zuerst!)"
                  detail="Richte als Erstes GitHub ein. Damit kannst du dich bei Vercel, Neon, Cursor und Co. direkt per GitHub anmelden."
                  href="https://github.com"
                  checked={checkedIds.has("acc-github")}
                  onToggle={() => toggle("acc-github")}
                />
                <ChecklistItem
                  id="acc-neon"
                  label="Neon-Account"
                  detail="Serverless PostgreSQL-Datenbank. Free Tier reicht."
                  href="https://neon.tech"
                  checked={checkedIds.has("acc-neon")}
                  onToggle={() => toggle("acc-neon")}
                />
                <ChecklistItem
                  id="acc-vercel"
                  label="Vercel-Account"
                  detail="Hosting & Deployment. Am besten direkt mit GitHub verknüpfen."
                  href="https://vercel.com"
                  checked={checkedIds.has("acc-vercel")}
                  onToggle={() => toggle("acc-vercel")}
                />
                <ChecklistItem
                  id="acc-resend"
                  label="Resend-Account"
                  detail="E-Mail-Versand (100 Mails/Tag gratis)."
                  href="https://resend.com"
                  checked={checkedIds.has("acc-resend")}
                  onToggle={() => toggle("acc-resend")}
                />
                <ChecklistItem
                  id="acc-stripe"
                  label="Stripe-Account (optional)"
                  detail="Nur nötig, wenn du Zahlungen abwickeln und Rechnungen generieren willst. Test-Modus ist kostenlos."
                  href="https://stripe.com"
                  checked={checkedIds.has("acc-stripe")}
                  onToggle={() => toggle("acc-stripe")}
                />
                <ChecklistItem
                  id="acc-anthropic"
                  label="Anthropic-Account"
                  detail="Claude AI API. API-Credits nötig (mind. $5 empfohlen)."
                  href="https://console.anthropic.com"
                  checked={checkedIds.has("acc-anthropic")}
                  onToggle={() => toggle("acc-anthropic")}
                />
                <ChecklistItem
                  id="acc-gcloud"
                  label="Google Cloud Console (optional)"
                  detail="Nur nötig, wenn du z.B. Google Maps, Search Console, Analytics oder Google OAuth nutzen willst."
                  href="https://console.cloud.google.com"
                  checked={checkedIds.has("acc-gcloud")}
                  onToggle={() => toggle("acc-gcloud")}
                />
                <ChecklistItem
                  id="acc-dataforseo"
                  label="DataforSEO-Account (optional)"
                  detail="Nur nötig, wenn du mit Keyword-Daten oder anderen SEO-relevanten Daten arbeiten möchtest."
                  href="https://dataforseo.com"
                  checked={checkedIds.has("acc-dataforseo")}
                  onToggle={() => toggle("acc-dataforseo")}
                />
                <ChecklistItem
                  id="acc-sistrix"
                  label="SISTRIX-Account (optional)"
                  detail="Nur nötig, wenn du die SISTRIX-API anbinden willst."
                  href="https://www.sistrix.de"
                  checked={checkedIds.has("acc-sistrix")}
                  onToggle={() => toggle("acc-sistrix")}
                />
                <ChecklistItem
                  id="acc-weitere"
                  label="Weitere APIs (optional)"
                  detail="Wenn du spezielle Anforderungen hast, richte vorab die Zugänge ein und besorge dir die API-Keys – dann sind wir in der praktischen Phase deutlich schneller. Beispiele: PandaDoc (digitale Signaturen), SEOspark (Keyword-Research), TopicLoops (Topic-Research), ElevenLabs (Text-to-Speech) … #younameit #youdecide"
                  checked={checkedIds.has("acc-weitere")}
                  onToggle={() => toggle("acc-weitere")}
                />
              </ChecklistSection>

              <ChecklistSection title="Cursor einrichten" checkedIds={checkedIds}>
                <ChecklistItem
                  id="setup-gh-signin"
                  label="Mit GitHub in Cursor anmelden"
                  detail="Cursor > Settings > Sign in with GitHub."
                  checked={checkedIds.has("setup-gh-signin")}
                  onToggle={() => toggle("setup-gh-signin")}
                />
                <ChecklistItem
                  id="setup-cursor-pro"
                  label="Cursor Pro aktivieren oder Free Trial starten"
                  detail="Für die vollen KI-Features im Workshop."
                  href="https://cursor.com/pricing"
                  checked={checkedIds.has("setup-cursor-pro")}
                  onToggle={() => toggle("setup-cursor-pro")}
                />
              </ChecklistSection>

              <ChecklistSection title="Am Workshop-Tag" checkedIds={checkedIds}>
                <ChecklistItem
                  id="day-laptop"
                  label="Laptop mit Netzteil einpacken"
                  checked={checkedIds.has("day-laptop")}
                  onToggle={() => toggle("day-laptop")}
                />
                <ChecklistItem
                  id="day-apikeys"
                  label="Alle API-Keys griffbereit haben"
                  detail="Neon Connection String, Resend API Key, Stripe Keys, Anthropic API Key."
                  checked={checkedIds.has("day-apikeys")}
                  onToggle={() => toggle("day-apikeys")}
                />
              </ChecklistSection>
            </div>
          )}
        </ChecklistProvider>
      </div>
    </div>
  )
}
