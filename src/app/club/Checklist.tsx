"use client"

import { useOptimistic, useTransition } from "react"
import { toggleChecklistItem } from "./checklist-actions"

interface Item {
  id: string
  label: string
  detail?: string
  href?: string
}

interface Section {
  title: string
  items: Item[]
}

const sections: Section[] = [
  {
    title: "Software installieren",
    items: [
      {
        id: "sw-nodejs",
        label: "Node.js (LTS, v22+)",
        detail: "JavaScript-Runtime. Am besten via nvm installieren.",
        href: "https://nodejs.org",
      },
      {
        id: "sw-git",
        label: "Git",
        detail: "Versionskontrolle. Prüfen mit: git --version",
        href: "https://git-scm.com",
      },
      {
        id: "sw-cursor",
        label: "Cursor Editor",
        detail: "KI-gestützter Code-Editor – die Basis unseres Workshops.",
        href: "https://cursor.com",
      },
      {
        id: "sw-browser",
        label: "Moderner Browser mit DevTools",
        detail: "Chrome, Firefox oder Edge – aktuellste Version.",
      },
    ],
  },
  {
    title: "Accounts anlegen",
    items: [
      {
        id: "acc-github",
        label: "GitHub-Account (zuerst!)",
        detail:
          "Richte als Erstes GitHub ein. Damit kannst du dich bei Vercel, Neon, Cursor und Co. direkt per GitHub anmelden.",
        href: "https://github.com",
      },
      {
        id: "acc-neon",
        label: "Neon-Account",
        detail: "Serverless PostgreSQL-Datenbank. Free Tier reicht.",
        href: "https://neon.tech",
      },
      {
        id: "acc-vercel",
        label: "Vercel-Account",
        detail:
          "Hosting & Deployment. Am besten direkt mit GitHub verknüpfen.",
        href: "https://vercel.com",
      },
      {
        id: "acc-resend",
        label: "Resend-Account",
        detail: "E-Mail-Versand (100 Mails/Tag gratis).",
        href: "https://resend.com",
      },
      {
        id: "acc-stripe",
        label: "Stripe-Account (optional)",
        detail:
          "Nur nötig, wenn du Zahlungen abwickeln und Rechnungen generieren willst. Test-Modus ist kostenlos.",
        href: "https://stripe.com",
      },
      {
        id: "acc-anthropic",
        label: "Anthropic-Account",
        detail: "Claude AI API. API-Credits nötig (mind. $5 empfohlen).",
        href: "https://console.anthropic.com",
      },
      {
        id: "acc-gcloud",
        label: "Google Cloud Console (optional)",
        detail:
          "Nur nötig, wenn du z.B. Google Maps, Search Console, Analytics oder Google OAuth nutzen willst.",
        href: "https://console.cloud.google.com",
      },
      {
        id: "acc-dataforseo",
        label: "DataforSEO-Account (optional)",
        detail:
          "Nur nötig, wenn du mit Keyword-Daten oder anderen SEO-relevanten Daten arbeiten möchtest.",
        href: "https://dataforseo.com",
      },
      {
        id: "acc-sistrix",
        label: "SISTRIX-Account (optional)",
        detail: "Nur nötig, wenn du die SISTRIX-API anbinden willst.",
        href: "https://www.sistrix.de",
      },
      {
        id: "acc-weitere",
        label: "Weitere APIs (optional)",
        detail:
          "Wenn du spezielle Anforderungen hast, richte vorab die Zugänge ein und besorge dir die API-Keys – dann sind wir in der praktischen Phase deutlich schneller. Beispiele: PandaDoc (digitale Signaturen), SEOspark (Keyword-Research), TopicLoops (Topic-Research), ElevenLabs (Text-to-Speech) … #younameit #youdecide",
      },
    ],
  },
  {
    title: "Cursor einrichten",
    items: [
      {
        id: "setup-gh-signin",
        label: "Mit GitHub in Cursor anmelden",
        detail: "Cursor > Settings > Sign in with GitHub.",
      },
      {
        id: "setup-cursor-pro",
        label: "Cursor Pro aktivieren oder Free Trial starten",
        detail: "Für die vollen KI-Features im Workshop.",
        href: "https://cursor.com/pricing",
      },
    ],
  },
  {
    title: "Am Workshop-Tag",
    items: [
      { id: "day-laptop", label: "Laptop mit Netzteil einpacken" },
      {
        id: "day-apikeys",
        label: "Alle API-Keys griffbereit haben",
        detail:
          "Neon Connection String, Resend API Key, Stripe Keys, Anthropic API Key.",
      },
    ],
  },
]

export function Checklist({
  initialCheckedIds,
}: {
  initialCheckedIds: string[]
}) {
  const [checkedIds, setCheckedIds] = useOptimistic(
    new Set(initialCheckedIds),
    (state: Set<string>, itemId: string) => {
      const next = new Set(state)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    }
  )
  const [, startTransition] = useTransition()

  function toggle(id: string) {
    const willBeChecked = !checkedIds.has(id)
    startTransition(async () => {
      setCheckedIds(id)
      await toggleChecklistItem(id, willBeChecked)
    })
  }

  const totalItems = sections.reduce((n, s) => n + s.items.length, 0)
  const doneCount = sections.reduce(
    (n, s) => n + s.items.filter((i) => checkedIds.has(i.id)).length,
    0
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-base font-bold text-on-surface mb-1">
            Deine Vorbereitungs-Checkliste
          </h2>
          <p className="text-sm text-on-surface-variant">
            Bitte erledige alle Punkte <strong>vor</strong> dem Workshop, damit
            wir direkt loslegen können.
          </p>
        </div>
        <span className="text-sm font-medium text-on-surface-variant shrink-0 ml-4">
          {doneCount}/{totalItems}
        </span>
      </div>

      <div className="space-y-10">
        {sections.map((section) => {
          const sorted = [...section.items].sort((a, b) => {
            const ac = checkedIds.has(a.id) ? 1 : 0
            const bc = checkedIds.has(b.id) ? 1 : 0
            return ac - bc
          })

          return (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-on-surface mb-4 uppercase tracking-wider opacity-60">
                {section.title}
              </h3>
              <div className="space-y-3">
                {sorted.map((item) => {
                  const checked = checkedIds.has(item.id)
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 cursor-pointer rounded-lg px-3 py-3 -mx-3 transition-all duration-300 ${
                        checked
                          ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40"
                          : "hover:bg-surface-container-high/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(item.id)}
                        className="mt-1 w-4 h-4 rounded-sm border-outline-variant/40 text-green-600 focus:ring-green-500/30 shrink-0"
                      />
                      <div
                        className={`transition-opacity duration-300 ${checked ? "opacity-70" : ""}`}
                      >
                        <span
                          className={`font-medium transition-colors duration-300 ${
                            checked
                              ? "text-green-700 dark:text-green-400 line-through decoration-green-400/50"
                              : "text-on-surface"
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.detail && (
                          <span className="block text-sm text-on-surface-variant mt-0.5">
                            {item.detail}
                          </span>
                        )}
                        {item.href && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm text-primary hover:underline mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.href.replace(/^https?:\/\//, "")} &rarr;
                          </a>
                        )}
                      </div>
                      {checked && (
                        <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-medium shrink-0 mt-1">
                          ✓ erledigt
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
