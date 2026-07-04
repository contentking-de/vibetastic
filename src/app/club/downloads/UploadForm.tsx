"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { upload } from "@vercel/blob/client"

const FILE_ICONS: Record<string, string> = {
  "application/pdf": "PDF",
  "application/zip": "ZIP",
  "application/x-zip-compressed": "ZIP",
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PPTX",
  "text/plain": "TXT",
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadForm() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !title.trim()) return

    setUploading(true)
    setError("")

    try {
      const blob = await upload(
        `downloads/${file.name}`,
        file,
        { access: "public", handleUploadUrl: "/api/downloads/upload" },
      )

      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || "application/octet-stream",
          blobUrl: blob.url,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Speichern fehlgeschlagen")
      }

      setTitle("")
      setDescription("")
      setFile(null)
      setOpen(false)
      if (fileRef.current) fileRef.current.value = ""
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
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
        Dokument hochladen
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-floating">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-on-surface">Neues Dokument</h3>
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
            placeholder="z.B. Setup-Anleitung Cursor"
            className="w-full rounded-lg border border-outline-variant/30 bg-bg px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Beschreibung</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optionale Kurzbeschreibung"
            className="w-full rounded-lg border border-outline-variant/30 bg-bg px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Datei * (max. 50 MB)</label>
          <input
            ref={fileRef}
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-on-surface-variant file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bg-soft file:text-on-surface hover:file:bg-bg-card file:cursor-pointer file:transition-colors"
            required
          />
          {file && (
            <p className="mt-1.5 text-xs text-on-surface-variant">
              {FILE_ICONS[file.type] || file.name.split(".").pop()?.toUpperCase() || "Datei"} — {formatSize(file.size)}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={uploading || !file || !title.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-ink text-bg transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Wird hochgeladen…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Hochladen
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
