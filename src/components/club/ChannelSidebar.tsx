"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Channel = {
  id: string
  name: string
  slug: string
  description: string | null
  emoji: string | null
}

export default function ChannelSidebar({ channels }: { channels: Channel[] }) {
  const pathname = usePathname()

  return (
    <div className="w-full lg:w-56 shrink-0">
      <div className="lg:sticky lg:top-24">
        <h3 className="px-3 mb-3 text-xs font-semibold uppercase tracking-wide text-ink-mute">
          Kanäle
        </h3>
        <div className="space-y-0.5">
          {channels.map((channel) => {
            const href = `/club/community/${channel.slug}`
            const isActive = pathname === href
            return (
              <Link
                key={channel.id}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-ink text-bg font-medium"
                    : "text-ink-soft hover:bg-bg-soft"
                }`}
              >
                <span className="text-base leading-none">{channel.emoji || "💬"}</span>
                <span className="truncate">{channel.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
