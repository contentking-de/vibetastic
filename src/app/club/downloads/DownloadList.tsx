"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Download = {
  id: string
  title: string
  description: string | null
  fileName: string
  fileSize: number
  mimeType: string
  blobUrl: string
  createdAt: Date | null
  uploadedByName: string | null
}

const TYPE_BADGES: Record<string, { label: string; color: string }> = {
  "application/pdf": { label: "PDF", color: "bg-red-100 text-red-700" },
  "application/zip": { label: "ZIP", color: "bg-yellow-100 text-yellow-700" },
  "application/x-zip-compressed": { label: "ZIP", color: "bg-yellow-100 text-yellow-700" },
  "image/jpeg": { label: "JPG", color: "bg-blue-100 text-blue-700" },
  "image/png": { label: "PNG", color: "bg-blue-100 text-blue-700" },
  "image/webp": { label: "WEBP", color: "bg-blue-100 text-blue-700" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { label: "DOCX", color: "bg-indigo-100 text-indigo-700" },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { label: "XLSX", color: "bg-green-100 text-green-700" },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { label: "PPTX", color: "bg-orange-100 text-orange-700" },
  "text/plain": { label: "TXT", color: "bg-gray-100 text-gray-700" },
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export default function DownloadList({
  downloads,
  isAdmin,
}: {
  downloads: Download[]
  isAdmin: boolean
}) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete(id: string, title: string) {
    if (!confirm(`„${title}" wirklich löschen?`)) return

    setDeleting(id)
    try {
      const res = await fetch("/api/downloads", {
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

  if (downloads.length === 0) {
    return (
      <div className="card-floating text-center py-12">
        <svg className="w-12 h-12 mx-auto text-on-surface-variant/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-sm text-on-surface-variant">Noch keine Dokumente vorhanden.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {downloads.map((dl) => {
        const badge = TYPE_BADGES[dl.mimeType] || {
          label: dl.fileName.split(".").pop()?.toUpperCase() || "FILE",
          color: "bg-gray-100 text-gray-700",
        }

        return (
          <div key={dl.id} className="card-floating flex items-start gap-4 group">
            <div className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-[11px] font-bold ${badge.color}`}>
              {badge.label}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-on-surface truncate">{dl.title}</h3>
                  {dl.description && (
                    <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{dl.description}</p>
                  )}
                  <p className="text-[11px] text-on-surface-variant/60 mt-1.5">
                    {dl.fileName} · {formatSize(dl.fileSize)}
                    {dl.createdAt && <> · {formatDate(dl.createdAt)}</>}
                    {dl.uploadedByName && <> · von {dl.uploadedByName}</>}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={dl.blobUrl}
                    download={dl.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-bg-soft text-on-surface hover:bg-bg-card transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download
                  </a>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(dl.id, dl.title)}
                      disabled={deleting === dl.id}
                      className="p-1.5 rounded-lg text-on-surface-variant/40 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-40"
                      title="Löschen"
                    >
                      {deleting === dl.id ? (
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
        )
      })}
    </div>
  )
}
