"use client"

import { useState } from "react"
import { approveSignup } from "./actions"
import { useRouter } from "next/navigation"

export default function ApproveButton({ signupId }: { signupId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleApprove() {
    if (!confirm("Bewerber bestätigen und als Mitglied aufnehmen?")) return
    setLoading(true)
    setError("")
    try {
      await approveSignup(signupId)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler bei der Bestätigung")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleApprove}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:bg-ink/85 transition-colors disabled:opacity-50"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {loading ? "Wird bestätigt…" : "Bewerber bestätigen"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
