"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Resource = {
  id: string
  title: string
  url: string
  description: string
  createdAt: Date | null
  createdByName: string | null
  createdById: string
}

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export default function ResourceList({
  resources,
  isAdmin,
  currentUserId,
}: {
  resources: Resource[]
  isAdmin: boolean
  currentUserId: string
}) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete(id: string, title: string) {
    if (!confirm(`„${title}" wirklich löschen?`)) return

    setDeleting(id)
    try {
      const res = await fetch("/api/resources", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error("Löschen fehlgeschlagen")
      router.refresh()
    } catch {
      alert("Fehler beim Löschen")
    } finally {
      setDeleting(null)
    }
  }

  if (resources.length === 0) {
    return (
      <div className="card-floating text-center py-12">
        <svg className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-6.364-6.364L4.5 8.28a4.5 4.5 0 001.242 7.244" />
        </svg>
        <p className="text-sm text-on-surface-variant">Noch keine Ressourcen vorhanden.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {resources.map((res) => {
        const canDelete = isAdmin || res.createdById === currentUserId

        return (
          <div key={res.id} className="card-floating group">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-6.364-6.364L4.5 8.28a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-on-surface truncate">{res.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{res.description}</p>
                    <p className="text-[11px] text-on-surface-variant/60 mt-1.5">
                      {getDomain(res.url)}
                      {res.createdAt && <> · {formatDate(res.createdAt)}</>}
                      {res.createdByName && <> · von {res.createdByName}</>}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-bg-soft text-on-surface hover:bg-bg-card transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      Öffnen
                    </a>

                    {canDelete && (
                      <button
                        onClick={() => handleDelete(res.id, res.title)}
                        disabled={deleting === res.id}
                        className="p-1.5 rounded-lg text-on-surface-variant/40 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-40"
                        title="Löschen"
                      >
                        {deleting === res.id ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
