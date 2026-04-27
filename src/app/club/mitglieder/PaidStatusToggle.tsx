"use client"

import { useState } from "react"
import { togglePaidStatus } from "./actions"
import { useRouter } from "next/navigation"

export default function PaidStatusToggle({
  memberId,
  paidAt,
}: {
  memberId: string
  paidAt: string | null
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    const action = paidAt ? 'Zahlungsstatus auf "offen" zurücksetzen?' : 'Als "bezahlt" markieren?'
    if (!confirm(action)) return
    setLoading(true)
    try {
      await togglePaidStatus(memberId)
      router.refresh()
    } catch {
      alert("Fehler beim Ändern des Status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {paidAt ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Bezahlt am {new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(paidAt))}
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
          Offen
        </span>
      )}
      <button
        onClick={handleToggle}
        disabled={loading}
        className="text-xs text-ink-mute hover:text-ink underline underline-offset-2 transition-colors disabled:opacity-50"
      >
        {loading ? "…" : paidAt ? "Zurücksetzen" : "Als bezahlt markieren"}
      </button>
    </div>
  )
}
