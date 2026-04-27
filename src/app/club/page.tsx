import { auth } from "@/lib/auth"
import Link from "next/link"
import { Checklist } from "./Checklist"
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
        <Checklist initialCheckedIds={checkedItems} />
      </div>
    </div>
  )
}
