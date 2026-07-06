"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ResourceForm() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !url.trim() || !description.trim()) return

    setSaving(true)
    setError("")

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          url: url.trim(),
          description: description.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Speichern fehlgeschlagen")
      }

      setTitle("")
      setUrl("")
      setDescription("")
      setOpen(false)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-ink text-bg transition-opacity hover:opacity-80"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Ressource hinzufügen
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-floating">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-on-surface">Neue Ressource</h3>
        <button
          type="button"
          onClick={() => { setOpen(false); setError("") }}
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Titel *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Cursor Dokumentation"
            className="w-full rounded-lg border border-outline-variant/30 bg-bg px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1.5">URL *</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-outline-variant/30 bg-bg px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
            Warum ist diese Ressource hilfreich? *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beschreibe kurz, warum du diese Ressource empfiehlst…"
            rows={3}
            className="w-full rounded-lg border border-outline-variant/30 bg-bg px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-none"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={saving || !title.trim() || !url.trim() || !description.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-ink text-bg transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Wird gespeichert…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Speichern
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setError("") }}
            className="px-4 py-2.5 rounded-lg text-sm text-on-surface-variant hover:bg-bg-soft transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </form>
  )
}
